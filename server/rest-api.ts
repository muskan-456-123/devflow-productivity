import type { Express, NextFunction, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { createContext } from "./_core/context";
import {
  createProject,
  createTask,
  deleteProject,
  deleteTask,
  deleteUser,
  getProjectById,
  getTaskById,
  getUserById,
  getUserByOpenId,
  listProjects,
  listTasks,
  listUsers,
  updateProject,
  updateTask,
  updateUser,
  upsertUser,
} from "./db";
import { projectStatuses, taskPriorities, taskStatuses } from "../drizzle/schema";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const idSchema = z.coerce.number().int().positive();
const userCreateSchema = z.object({
  openId: z.string().trim().min(2).max(64),
  name: z.string().trim().min(1).max(160).optional(),
  email: z.string().trim().email().max(320).optional(),
  loginMethod: z.string().trim().max(64).optional(),
});
const userUpdateSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  email: z.string().trim().email().max(320).optional(),
}).strict().refine(value => Object.keys(value).length > 0, "At least one user field is required");
const projectCreateSchema = z.object({
  ownerId: idSchema.optional(),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(5000).optional(),
  status: z.enum(projectStatuses).optional(),
  color: z.string().trim().min(2).max(32).optional(),
});
const projectUpdateSchema = projectCreateSchema.omit({ ownerId: true }).partial().strict().refine(value => Object.keys(value).length > 0, "At least one project field is required");
const taskCreateSchema = z.object({
  projectId: idSchema,
  assigneeId: idSchema.optional().nullable(),
  title: z.string().trim().min(2).max(240),
  description: z.string().trim().max(5000).optional(),
  status: z.enum(taskStatuses).optional(),
  priority: z.enum(taskPriorities).optional(),
  dueAt: z.coerce.date().optional().nullable(),
});
const taskUpdateSchema = taskCreateSchema.omit({ projectId: true }).partial().strict().refine(value => Object.keys(value).length > 0, "At least one task field is required");
const taskStatusSchema = z.object({ status: z.enum(taskStatuses) });

function parseId(value: string | undefined, label: string): number {
  const result = idSchema.safeParse(value);
  if (!result.success) throw new ApiError(400, "INVALID_ID", `${label} must be a positive integer`);
  return result.data;
}

function parseBody<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ApiError(400, "VALIDATION_ERROR", "Request validation failed", result.error.flatten());
  }
  return result.data;
}

async function resolveActorId(req: Request, res: Response, fallbackOwnerId?: number): Promise<number> {
  const context = await createContext({ req, res } as never);
  if (context.user?.id) return context.user.id;

  // The header/body fallback is intentionally development-only, making endpoint demos easy
  // while keeping production traffic dependent on the built-in session.
  if (process.env.NODE_ENV !== "production") {
    const headerValue = req.header("x-user-id");
    const parsedHeader = headerValue ? idSchema.safeParse(headerValue) : null;
    if (parsedHeader?.success) return parsedHeader.data;
    if (fallbackOwnerId) return fallbackOwnerId;
  }

  throw new ApiError(401, "UNAUTHENTICATED", "Sign in or provide a development x-user-id header");
}

async function requireProjectOwner(projectId: number, actorId: number) {
  const project = await getProjectById(projectId);
  if (!project) throw new ApiError(404, "PROJECT_NOT_FOUND", "Project was not found");
  if (project.ownerId !== actorId) throw new ApiError(403, "FORBIDDEN", "You do not own this project");
  return project;
}

async function requireTaskOwner(taskId: number, actorId: number) {
  const task = await getTaskById(taskId);
  if (!task) throw new ApiError(404, "TASK_NOT_FOUND", "Task was not found");
  await requireProjectOwner(task.projectId, actorId);
  return task;
}

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    void handler(req, res, next).catch(next);
  };
}

function sendResource<T>(res: Response, data: T, status = 200) {
  res.status(status).json({ data });
}

export function registerRestApi(app: Express) {
  const router = Router();

  router.get("/health", (_req, res) => sendResource(res, { status: "ok", service: "dreamdesk-api" }));

  router.get("/users", asyncRoute(async (_req, res) => sendResource(res, await listUsers())));
  router.post("/users", asyncRoute(async (req, res) => {
    const input = parseBody(userCreateSchema, req.body);
    await upsertUser(input);
    const user = await getUserByOpenId(input.openId);
    if (!user) throw new ApiError(503, "DATABASE_UNAVAILABLE", "User could not be persisted");
    sendResource(res, user, 201);
  }));
  router.get("/users/:id", asyncRoute(async (req, res) => {
    const user = await getUserById(parseId(req.params.id, "User id"));
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User was not found");
    sendResource(res, user);
  }));
  router.patch("/users/:id", asyncRoute(async (req, res) => {
    const id = parseId(req.params.id, "User id");
    const actorId = await resolveActorId(req, res, id);
    if (actorId !== id) throw new ApiError(403, "FORBIDDEN", "You can only update your own user profile");
    const user = await updateUser(id, parseBody(userUpdateSchema, req.body));
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User was not found");
    sendResource(res, user);
  }));
  router.delete("/users/:id", asyncRoute(async (req, res) => {
    const id = parseId(req.params.id, "User id");
    const actorId = await resolveActorId(req, res, id);
    if (actorId !== id) throw new ApiError(403, "FORBIDDEN", "You can only delete your own user profile");
    const user = await getUserById(id);
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User was not found");
    await deleteUser(id);
    res.status(204).send();
  }));

  router.get("/projects", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    sendResource(res, await listProjects(actorId));
  }));
  router.post("/projects", asyncRoute(async (req, res) => {
    const input = parseBody(projectCreateSchema, req.body);
    const actorId = await resolveActorId(req, res, input.ownerId);
    const project = await createProject({
      ownerId: actorId,
      name: input.name,
      description: input.description,
      status: input.status ?? "active",
      color: input.color ?? "violet",
    });
    if (!project) throw new ApiError(503, "DATABASE_UNAVAILABLE", "Project could not be persisted");
    sendResource(res, project, 201);
  }));
  router.get("/projects/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    sendResource(res, await requireProjectOwner(parseId(req.params.id, "Project id"), actorId));
  }));
  router.patch("/projects/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const id = parseId(req.params.id, "Project id");
    await requireProjectOwner(id, actorId);
    const project = await updateProject(id, parseBody(projectUpdateSchema, req.body));
    if (!project) throw new ApiError(404, "PROJECT_NOT_FOUND", "Project was not found");
    sendResource(res, project);
  }));
  router.delete("/projects/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const id = parseId(req.params.id, "Project id");
    await requireProjectOwner(id, actorId);
    await deleteProject(id);
    res.status(204).send();
  }));

  router.get("/projects/:projectId/tasks", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const projectId = parseId(req.params.projectId, "Project id");
    await requireProjectOwner(projectId, actorId);
    sendResource(res, await listTasks(projectId));
  }));
  router.post("/tasks", asyncRoute(async (req, res) => {
    const input = parseBody(taskCreateSchema, req.body);
    const actorId = await resolveActorId(req, res);
    await requireProjectOwner(input.projectId, actorId);
    const task = await createTask({
      projectId: input.projectId,
      assigneeId: input.assigneeId ?? null,
      title: input.title,
      description: input.description,
      status: input.status ?? "todo",
      priority: input.priority ?? "medium",
      dueAt: input.dueAt ?? null,
    });
    if (!task) throw new ApiError(503, "DATABASE_UNAVAILABLE", "Task could not be persisted");
    sendResource(res, task, 201);
  }));
  router.get("/tasks/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    sendResource(res, await requireTaskOwner(parseId(req.params.id, "Task id"), actorId));
  }));
  router.patch("/tasks/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const id = parseId(req.params.id, "Task id");
    await requireTaskOwner(id, actorId);
    const task = await updateTask(id, parseBody(taskUpdateSchema, req.body));
    if (!task) throw new ApiError(404, "TASK_NOT_FOUND", "Task was not found");
    sendResource(res, task);
  }));
  router.patch("/tasks/:id/status", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const id = parseId(req.params.id, "Task id");
    await requireTaskOwner(id, actorId);
    const task = await updateTask(id, parseBody(taskStatusSchema, req.body));
    if (!task) throw new ApiError(404, "TASK_NOT_FOUND", "Task was not found");
    sendResource(res, task);
  }));
  router.delete("/tasks/:id", asyncRoute(async (req, res) => {
    const actorId = await resolveActorId(req, res);
    const id = parseId(req.params.id, "Task id");
    await requireTaskOwner(id, actorId);
    await deleteTask(id);
    res.status(204).send();
  }));

  app.use("/api/v1", router);
  app.use("/api/v1", (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: { code: error.code, message: error.message, details: error.details } });
      return;
    }
    console.error("[REST API] Unhandled error", error);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "An unexpected server error occurred" } });
  });
}
