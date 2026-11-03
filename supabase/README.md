# Supabase integration boundary

Database, authentication and storage integration starts in Phase 5. Versioned migrations and development seeds will live here. Phase 1 only validates optional environment settings; it does not connect to Supabase, create a client, or provision tables or users.

Public settings: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Privileged tasks may later use `SUPABASE_SERVICE_ROLE_KEY` exclusively in server-only modules. Never prefix a privileged credential with `NEXT_PUBLIC_`. An environment variable being present does not mean authentication or authorization is implemented.
