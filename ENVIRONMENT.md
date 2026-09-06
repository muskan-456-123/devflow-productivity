# Task 2 Environment Configuration

The full-stack DreamDesk project uses the managed environment supplied by WebDev. The backend reads `DATABASE_URL` for MySQL/TiDB persistence and the built-in Manus authentication variables for session verification. The project also uses `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `OWNER_OPEN_ID`, and `OWNER_NAME` through the scaffold’s existing auth layer.

These values are injected into development and production by the project environment. Do not hardcode them in source files, commit `.env` files, or paste database credentials into API documentation. For local work outside the managed environment, copy `.env.example` to an ignored `.env` file and provide values through your local secret manager.

During development, the REST API can use an `x-user-id` header to make endpoint demonstrations easy. That fallback is disabled in production; deployed requests must use the built-in authenticated session.

The frontend dashboard does not need a public API base URL because the full-stack template proxies `/api/v1` and `/api/trpc` from the same origin. If the UI is later split into a separate deployment, add a non-secret `VITE_API_BASE_URL` variable to the frontend environment and keep all server credentials on the backend.
