# Environment Configuration

DevFlow Task 1 runs entirely in the browser with typed local mock data. There are **no custom environment variables** to configure, and a local `.env` file is not required for development or production builds.

When this frontend is connected to Task 2’s API, create an `.env.example` file containing only a non-secret public configuration key, such as `VITE_API_BASE_URL=http://localhost:3001/api`. Keep the real endpoint and every credential in an ignored local `.env` file. Do not commit API keys, passwords, database connection strings, access tokens, or private URLs.
