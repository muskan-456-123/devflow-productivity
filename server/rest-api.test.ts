import express from "express";
import { createServer, type Server } from "node:http";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockState = vi.hoisted(() => ({
  users: [] as any[],
  projects: [] as any[],
  tasks: [] as any[],
  nextUserId: 1,
  nextProjectId: 1,
  nextTaskId: 1,
}));

vi.mock("./db", () => ({
  upsertUser: async (input: any) => {
    const existing = mockState.users.find(user => user.openId === input.openId);
    if (existing) Object.assign(existing, input);
    else mockState.users.push({ id: mockState.nextUserId++, role: "user", ...input });
  },
  getUserByOpenId: async (openId: string) => mockState.users.find(user => user.openId === openId),
  getUserById: async (id: number) => mockState.users.find(user => user.id === id),
  listUsers: async () => mockState.users,
  updateUser: async (id: number, input: any) => {
    const user = mockState.users.find(item => item.id === id);
    if (!user) return undefined;
    Object.assign(user, input);
    return user;
  },
  deleteUser: async (id: number) => {
    mockState.users = mockState.users.filter(user => user.id !== id);
  },
  createProject: async (input: any) => {
    const project = { id: mockState.nextProjectId++, ...input };
    mockState.projects.push(project);
    return project;
  },
  listProjects: async (ownerId: number) => mockState.projects.filter(project => project.ownerId === ownerId),
  getProjectById: async (id: number) => mockState.projects.find(project => project.id === id),
  updateProject: async (id: number, input: any) => {
    const project = mockState.projects.find(item => item.id === id);
    if (!project) return undefined;
    Object.assign(project, input);
    return project;
  },
  deleteProject: async (id: number) => {
    mockState.projects = mockState.projects.filter(project => project.id !== id);
    mockState.tasks = mockState.tasks.filter(task => task.projectId !== id);
  },
  createTask: async (input: any) => {
    const task = { id: mockState.nextTaskId++, ...input };
    mockState.tasks.push(task);
    return task;
  },
  listTasks: async (projectId?: number) => projectId === undefined ? mockState.tasks : mockState.tasks.filter(task => task.projectId === projectId),
  getTaskById: async (id: number) => mockState.tasks.find(task => task.id === id),
  updateTask: async (id: number, input: any) => {
    const task = mockState.tasks.find(item => item.id === id);
    if (!task) return undefined;
    Object.assign(task, input);
    return task;
  },
  deleteTask: async (id: number) => {
    mockState.tasks = mockState.tasks.filter(task => task.id !== id);
  },
}));

import { registerRestApi } from "./rest-api";

const servers: Server[] = [];

async function startTestServer() {
  const app = express();
  app.use(express.json());
  registerRestApi(app);
  const server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, resolve));
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server did not bind to a port");
  return `http://127.0.0.1:${address.port}`;
}

async function jsonRequest(baseUrl: string, path: string, init: RequestInit = {}) {
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init.headers ?? {}) },
  });
}

afterEach(async () => {
  await Promise.all(servers.splice(0).map(server => new Promise<void>(resolve => server.close(() => resolve()))));
  mockState.users = [];
  mockState.projects = [];
  mockState.tasks = [];
  mockState.nextUserId = 1;
  mockState.nextProjectId = 1;
  mockState.nextTaskId = 1;
});

describe("Task 2 REST API", () => {
  it("returns a service health document", async () => {
    const baseUrl = await startTestServer();
    const response = await fetch(`${baseUrl}/api/v1/health`);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ data: { status: "ok", service: "dreamdesk-api" } });
  });

  it("rejects invalid user writes with a structured 400 error", async () => {
    const baseUrl = await startTestServer();
    const response = await jsonRequest(baseUrl, "/api/v1/users", {
      method: "POST",
      body: JSON.stringify({ openId: "x", email: "not-an-email" }),
    });
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details).toBeDefined();
  });

  it("requires authentication for project reads", async () => {
    const baseUrl = await startTestServer();
    const response = await fetch(`${baseUrl}/api/v1/projects`);
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ error: { code: "UNAUTHENTICATED" } });
  });

  it("supports user, project, task CRUD and explicit status updates", async () => {
    const baseUrl = await startTestServer();
    const userResponse = await jsonRequest(baseUrl, "/api/v1/users", {
      method: "POST",
      body: JSON.stringify({ openId: "demo-user", name: "Ava Chen", email: "ava@example.com" }),
    });
    expect(userResponse.status).toBe(201);
    const userBody = await userResponse.json();
    expect(userBody.data.name).toBe("Ava Chen");
    const userRead = await fetch(`${baseUrl}/api/v1/users/${userBody.data.id}`);
    expect(userRead.status).toBe(200);
    const userUpdate = await jsonRequest(baseUrl, `/api/v1/users/${userBody.data.id}`, {
      method: "PATCH",
      headers: { "x-user-id": String(userBody.data.id) },
      body: JSON.stringify({ name: "Ava Chen Updated" }),
    });
    expect((await userUpdate.json()).data.name).toBe("Ava Chen Updated");

    const headers = { "x-user-id": String(userBody.data.id) };
    const projectResponse = await jsonRequest(baseUrl, "/api/v1/projects", {
      method: "POST",
      headers,
      body: JSON.stringify({ name: "DreamDesk API", description: "Task 2" }),
    });
    expect(projectResponse.status).toBe(201);
    const project = (await projectResponse.json()).data;
    const projectRead = await fetch(`${baseUrl}/api/v1/projects/${project.id}`, { headers });
    expect(projectRead.status).toBe(200);
    const projectUpdate = await jsonRequest(baseUrl, `/api/v1/projects/${project.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "archived", color: "sunset" }),
    });
    expect((await projectUpdate.json()).data.status).toBe("archived");

    const listResponse = await fetch(`${baseUrl}/api/v1/projects`, { headers });
    expect((await listResponse.json()).data).toHaveLength(1);

    const taskResponse = await jsonRequest(baseUrl, "/api/v1/tasks", {
      method: "POST",
      headers,
      body: JSON.stringify({ projectId: project.id, title: "Wire task status", priority: "high" }),
    });
    expect(taskResponse.status).toBe(201);
    const task = (await taskResponse.json()).data;
    const taskRead = await fetch(`${baseUrl}/api/v1/tasks/${task.id}`, { headers });
    expect(taskRead.status).toBe(200);

    const statusResponse = await jsonRequest(baseUrl, `/api/v1/tasks/${task.id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "in_progress" }),
    });
    expect((await statusResponse.json()).data.status).toBe("in_progress");

    const updateResponse = await jsonRequest(baseUrl, `/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ title: "Wire and document task status" }),
    });
    expect((await updateResponse.json()).data.title).toContain("document");

    const deleteTaskResponse = await fetch(`${baseUrl}/api/v1/tasks/${task.id}`, { method: "DELETE", headers });
    expect(deleteTaskResponse.status).toBe(204);

    const deleteProjectResponse = await fetch(`${baseUrl}/api/v1/projects/${project.id}`, { method: "DELETE", headers });
    expect(deleteProjectResponse.status).toBe(204);
    const deleteUserResponse = await fetch(`${baseUrl}/api/v1/users/${userBody.data.id}`, { method: "DELETE", headers });
    expect(deleteUserResponse.status).toBe(204);
  });

  it("returns ownership and not-found errors consistently", async () => {
    const baseUrl = await startTestServer();
    const userResponse = await jsonRequest(baseUrl, "/api/v1/users", {
      method: "POST",
      body: JSON.stringify({ openId: "owner-user", name: "Owner" }),
    });
    const owner = (await userResponse.json()).data;
    const missingUser = await fetch(`${baseUrl}/api/v1/users/999`, { headers: { "x-user-id": String(owner.id) } });
    expect(missingUser.status).toBe(404);
    await expect(missingUser.json()).resolves.toMatchObject({ error: { code: "USER_NOT_FOUND" } });
    const missingProject = await fetch(`${baseUrl}/api/v1/projects/999`, { headers: { "x-user-id": String(owner.id) } });
    expect(missingProject.status).toBe(404);
    await expect(missingProject.json()).resolves.toMatchObject({ error: { code: "PROJECT_NOT_FOUND" } });
    const projectResponse = await jsonRequest(baseUrl, "/api/v1/projects", {
      method: "POST",
      headers: { "x-user-id": String(owner.id) },
      body: JSON.stringify({ name: "Private project" }),
    });
    const project = (await projectResponse.json()).data;
    const forbidden = await fetch(`${baseUrl}/api/v1/projects/${project.id}`, { headers: { "x-user-id": "999" } });
    expect(forbidden.status).toBe(403);
    const missing = await fetch(`${baseUrl}/api/v1/tasks/999`, { headers: { "x-user-id": String(owner.id) } });
    expect(missing.status).toBe(404);
    await expect(missing.json()).resolves.toMatchObject({ error: { code: "TASK_NOT_FOUND" } });
  });
});
