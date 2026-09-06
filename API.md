# DreamDesk REST API

Task 2 adds a versioned REST surface under `/api/v1`. The API uses JSON request and response bodies, validates every write with Zod, scopes projects and tasks to the authenticated user, and returns consistent error envelopes.

## Authentication

In a deployed environment, project and task routes use the built-in Manus session cookie. During local development, requests may use `x-user-id: <numeric-user-id>` after creating a user with `POST /api/v1/users`. The development header fallback is disabled when `NODE_ENV=production`.

## Response Shape

Successful reads and writes use:

```json
{ "data": {} }
```

Validation and server errors use:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {}
  }
}
```

## Endpoint Reference

| Method | Endpoint | Purpose | Success |
| --- | --- | --- | --- |
| GET | `/api/v1/health` | Confirm the API is running. | `200` |
| GET | `/api/v1/users` | List users for user-management views. | `200` |
| POST | `/api/v1/users` | Create or upsert a user by `openId`. | `201` |
| GET | `/api/v1/users/:id` | Retrieve one user. | `200` |
| PATCH | `/api/v1/users/:id` | Update the signed-in user’s name or email. | `200` |
| DELETE | `/api/v1/users/:id` | Delete the signed-in user profile. | `204` |
| GET | `/api/v1/projects` | List projects owned by the current user. | `200` |
| POST | `/api/v1/projects` | Create a project. | `201` |
| GET | `/api/v1/projects/:id` | Retrieve one owned project. | `200` |
| PATCH | `/api/v1/projects/:id` | Update name, description, status, or color. | `200` |
| DELETE | `/api/v1/projects/:id` | Delete an owned project and its tasks. | `204` |
| GET | `/api/v1/projects/:projectId/tasks` | List tasks in an owned project. | `200` |
| POST | `/api/v1/tasks` | Create a task in an owned project. | `201` |
| GET | `/api/v1/tasks/:id` | Retrieve one task in an owned project. | `200` |
| PATCH | `/api/v1/tasks/:id` | Update task fields. | `200` |
| PATCH | `/api/v1/tasks/:id/status` | Change status to `todo`, `in_progress`, or `done`. | `200` |
| DELETE | `/api/v1/tasks/:id` | Delete a task. | `204` |

## Examples

Create a user:

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H 'Content-Type: application/json' \
  -d '{"openId":"demo-user-001","name":"Ava Chen","email":"ava@example.com","loginMethod":"demo"}'
```

Create a project using the local development header:

```bash
curl -X POST http://localhost:3000/api/v1/projects \
  -H 'Content-Type: application/json' \
  -H 'x-user-id: 1' \
  -d '{"name":"DreamDesk API","description":"Task 2 backend foundation","color":"orchid"}'
```

Create a task:

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'x-user-id: 1' \
  -d '{"projectId":1,"title":"Add task status filters","priority":"high","status":"todo"}'
```

Move a task into progress:

```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/1/status \
  -H 'Content-Type: application/json' \
  -H 'x-user-id: 1' \
  -d '{"status":"in_progress"}'
```

## Status Codes

`201` indicates a resource was created. `200` indicates a successful read or update. `204` indicates a successful deletion with no response body. `400` means the path parameter or JSON body is invalid. `401` means no authenticated user is available. `403` means the authenticated user does not own the resource. `404` means the requested user, project, or task does not exist. `500` represents an unexpected server error, and `503` indicates that the database is unavailable for a write operation.

## Dashboard Verification

DreamDesk uses the API client at `client/src/lib/api.ts` to request the current user’s projects and the first project’s tasks. The room keeps the local demo data when authentication is unavailable, while the top-right sync pill exposes the current state. Use these controlled preview URLs to review the visible states without seeding a database:

| URL | Expected state |
| --- | --- |
| `/?apiState=loading` | Syncing workspace |
| `/?apiState=connected` | Live workspace |
| `/?apiState=empty` | No projects yet |
| `/?apiState=fallback` | Demo workspace |
| `/?apiState=error` | Offline · local view |

## Data Model

Users own projects, and projects own tasks. Deleting a project cascades to its tasks. Tasks may optionally reference a user as an assignee; deleting that user leaves the task in place and clears the assignee. All business timestamps are stored by the database in UTC-compatible timestamp columns.
