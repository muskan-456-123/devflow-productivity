import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertProject,
  InsertTask,
  InsertUser,
  Project,
  ProjectStatus,
  Task,
  TaskPriority,
  TaskStatus,
  User,
  projects,
  tasks,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  for (const field of textFields) {
    if (user[field] === undefined) continue;
    const normalized = user[field] ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getUserByOpenId(openId: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listUsers(): Promise<User[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUser(id: number, input: Partial<Pick<InsertUser, "name" | "email">>): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(users).set(input).where(eq(users.id, id));
  return getUserById(id);
}

export async function deleteUser(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(users).where(eq(users.id, id));
}

export async function createProject(input: InsertProject): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(projects).values(input);
  return db.select().from(projects).where(eq(projects.id, result[0].insertId)).limit(1).then(rows => rows[0]);
}

export async function listProjects(ownerId: number): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq(projects.ownerId, ownerId)).orderBy(desc(projects.updatedAt));
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

export async function updateProject(id: number, input: Partial<Pick<InsertProject, "name" | "description" | "status" | "color">>): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(projects).set(input).where(eq(projects.id, id));
  return getProjectById(id);
}

export async function deleteProject(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(projects).where(eq(projects.id, id));
}

export async function createTask(input: InsertTask): Promise<Task | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(tasks).values(input);
  return db.select().from(tasks).where(eq(tasks.id, result[0].insertId)).limit(1).then(rows => rows[0]);
}

export async function listTasks(projectId?: number): Promise<Task[]> {
  const db = await getDb();
  if (!db) return [];
  const query = projectId === undefined
    ? db.select().from(tasks)
    : db.select().from(tasks).where(eq(tasks.projectId, projectId));
  return query.orderBy(desc(tasks.updatedAt));
}

export async function getTaskById(id: number): Promise<Task | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  return result[0];
}

export async function updateTask(id: number, input: Partial<Pick<InsertTask, "title" | "description" | "status" | "priority" | "assigneeId" | "dueAt">>): Promise<Task | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(tasks).set(input).where(eq(tasks.id, id));
  return getTaskById(id);
}

export async function deleteTask(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(tasks).where(eq(tasks.id, id));
}

export type { ProjectStatus, TaskPriority, TaskStatus };
