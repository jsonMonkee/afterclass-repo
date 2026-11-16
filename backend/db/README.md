# Backend database setup

The FastAPI backend uses the Supabase Data API through the Python Supabase client. For this path, configure the project URL and server-only secret API key; a direct Postgres connection string is not required. The backend defaults to production-safe settings; the copied local example sets `APP_ENV=development` to enable `/docs` and optional diagnostics.

1. In Supabase, open **Project Settings → API** and copy the Project URL and a server-only secret key.
2. Copy `backend/.env.example` to `backend/.env`; set `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (or the legacy `SUPABASE_SERVICE_ROLE_KEY`), and long random values for the admin and diagnostics tokens.
   Set a long random `AUTH_SESSION_SECRET`; FastAPI both signs and verifies the session cookie.
3. Open the SQL Editor in that same Supabase project and run `backend/db/migrations/202611140001_initial_afterclass.sql` once.
4. From the repository root, create and install the backend environment: `python -m venv backend/.venv`, then `backend/.venv/Scripts/python.exe -m pip install -e "backend[dev]"` on Windows (or `backend/.venv/bin/python -m pip install -e "backend[dev]"` on macOS/Linux).
5. Start the backend from the repository root with `npm run backend:dev`.
6. Open `http://localhost:8100/docs` for interactive API docs.

The secret key bypasses row-level security. It must only exist in `backend/.env` or the backend host's secret manager, never in frontend variables or browser code. Backend routes perform authorization before issuing writes. Keep RLS enabled and do not add a public policy for the diagnostics table.

## Verify a write and read

With `ENABLE_DB_DIAGNOSTICS=true`, `APP_ENV=development`, and `DIAGNOSTICS_API_TOKEN` configured, call `POST /api/v1/diagnostics/db-records` with `X-Diagnostics-Token` and a JSON message. The response includes the inserted row ID. Then call `GET /api/v1/diagnostics/db-records/{id}` with the same token. Seeing the same message and ID proves the API wrote the row to Supabase and read it back. The endpoint returns 404 outside development or when disabled. Remove the smoke-test row from the Supabase table after testing if desired.

To create actual domain data directly through the API, use a terminal after setting `ADMIN_API_TOKEN` in `backend/.env`:

```powershell
$headers = @{ "X-Admin-Token" = "your-local-admin-token" }
$body = @{
  campus_id = "auk"
  name = "API Persistence Check Club"
  category = "Technology"
  tagline = "Created through FastAPI"
} | ConvertTo-Json

$created = Invoke-RestMethod `
  -Uri "http://localhost:8100/api/v1/clubs" `
  -Method Post -Headers $headers -ContentType "application/json" -Body $body
$created.data.id

Invoke-RestMethod -Uri "http://localhost:8100/api/v1/clubs?campus_id=auk"
```

The response gives the new row ID. Confirm the same club in Supabase **Table Editor → public.clubs**. Club edits use the signed `afterclass_session` cookie issued at login and enforce the club-lead/superadmin ownership check.

For an isolated smoke test in `api_smoke_test_records`, enable diagnostics in local `backend/.env`, then run:

```powershell
$headers = @{ "X-Diagnostics-Token" = "your-local-diagnostics-token" }
$check = Invoke-RestMethod `
  -Uri "http://localhost:8100/api/v1/diagnostics/db-records" `
  -Method Post -Headers $headers -ContentType "application/json" `
  -Body (@{ message = "Supabase write/read check" } | ConvertTo-Json)
$check.data.id

Invoke-RestMethod `
  -Uri "http://localhost:8100/api/v1/diagnostics/db-records/$($check.data.id)" `
  -Headers $headers
```

The feature is off by default and returns 404 in production. Remove test rows from Supabase **Table Editor → public.api_smoke_test_records** after testing.
