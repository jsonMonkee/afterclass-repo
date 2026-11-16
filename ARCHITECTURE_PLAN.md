# Afterclass Codebase Architecture Plan

## Goals

- Keep the student-facing frontend and server API in separate top-level folders.
- Organize backend code by product domain so a route does not contain database, payment, and business-rule code together.
- Treat Supabase Postgres as the source of truth; keep demo/sample data out of production request paths.
- Make campus scoping explicit on every campus-owned record.
- Preserve existing URLs while moving implementation, so the restructure does not require a frontend rewrite.

## Recommended shape

Use a small monorepo with two deployable applications and a generated API client. Keep the frontend as Next.js. Run a separate Python API service using **FastAPI** that owns authentication checks, business rules, database access, uploads, and payment callbacks. Both apps can be deployed independently; local development can run them together. FastAPI's OpenAPI generation provides the API contract used to generate the frontend client.

```text
afterclass/
├── frontend/                         # Next.js UI only
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── src/app/                      # Pages, layouts, loading/error UI
│   ├── src/features/                 # UI grouped by clubs, Dhanda, events, etc.
│   ├── src/components/               # Shared presentational components
│   ├── src/lib/api/                  # Typed client for backend HTTP API
│   └── public/
├── backend/                          # FastAPI service; owns server behavior
│   ├── pyproject.toml                 # Python dependencies and tooling
│   ├── app/
│   │   ├── main.py                   # Create app, register routers and lifespan
│   │   ├── core/                     # Settings, security, errors, logging
│   │   ├── dependencies/             # Auth, campus context, DB sessions
│   │   ├── integrations/             # Supabase Auth/Storage, Razorpay adapters
│   │   └── modules/
│   │       ├── auth/
│   │       ├── campuses/
│   │       ├── clubs/
│   │       ├── dhanda/
│   │       ├── opportunities/
│   │       ├── uploads/
│   │       └── payments/
│   ├── db/
│   │   ├── migrations/               # Ordered SQL migrations
│   │   ├── seeds/                    # Explicit local/demo seed data
│   │   └── README.md                 # Apply, rollback, and seed instructions
│   ├── tests/
│   └── pyproject.toml                # FastAPI, Pydantic, DB driver, test tooling
├── packages/
│   └── api-client/                   # Generated TypeScript client from OpenAPI
├── docs/
├── package.json                      # Frontend/workspace scripts
├── package-lock.json
└── README.md
```

### Backend module pattern

Each module follows the same request path. Keep HTTP handling thin and put rules in the service layer.

```text
modules/dhanda/
├── router.py                         # APIRouter endpoints + dependencies
├── schemas.py                        # Pydantic request/response models
├── service.py                        # Product rules and orchestration
├── repository.py                     # PostgreSQL queries only
├── models.py                         # Persistence models, if using ORM
└── dependencies.py                   # Module-level providers as needed
```

Payments and file storage are adapters under `backend/app/integrations/`, called by domain services. For example, Dhanda asks the payment adapter to create an order; the promotions service decides when a promotion becomes active. A webhook route verifies the provider signature and passes a normalized event into the payments service. Routers must not contain SQL or call Supabase directly. Use Pydantic for validation and OpenAPI generation, and FastAPI dependencies for authentication, authorization, and request-scoped database sessions.

### Database client approach

Use Supabase Auth and Storage APIs from server-only integration modules. For relational application data, choose one PostgreSQL access path for FastAPI: SQLAlchemy 2 async with `asyncpg` for maintainable models and transactions, or `asyncpg` directly for a deliberately SQL-first repository layer. Keep SQL migrations authoritative in `backend/db/migrations`; do not use a Supabase data client and a separate ORM to write the same tables.

## API ownership and URL map

Use `/api/v1` for new API endpoints. FastAPI serves the API and OpenAPI document at `/openapi.json`; enable interactive docs only in development. Keep current `/api/...` paths as temporary Next.js proxies or FastAPI aliases during migration, then remove them only after the frontend and external integrations have switched. Generate the TypeScript client from OpenAPI instead of duplicating request/response types manually.

| Domain | Endpoint examples | Owns |
| --- | --- | --- |
| Auth | `POST /api/v1/auth/login`, `POST /logout`, `GET /session` | Sessions, roles, access checks |
| Campuses | `GET /api/v1/campuses/:campusId` | Campus lookup and tenant context |
| Clubs | `GET /api/v1/clubs`, `GET/PATCH /clubs/:clubId` | Club directory and authorized lead edits |
| Dhanda | `GET/POST /api/v1/dhanda/listings`, `GET/PATCH /businesses/:id` | Marketplace listings and vendor profile |
| Dhanda promotions | `GET/POST /api/v1/dhanda/promotions`, `POST /promotions/:id/verify` | Promotion lifecycle and launch offer |
| Opportunities | `GET /api/v1/opportunities/hackathons`, `GET /student-perks` | Aggregated opportunity feeds |
| Uploads | `POST /api/v1/uploads/sign` | Authorization and scoped signed-upload URLs |
| Payments | `POST /api/v1/payments/webhook/razorpay` | Signature verification, idempotent provider events |

An endpoint should declare validation schema, authentication requirement, and campus scope at registration. Public catalog reads and vendor/admin mutations must have separate policies.

## Database ownership and proposed schema

The migration files live with the backend because the API owns database behavior. Keep table names and migrations in SQL; do not edit the live schema manually without adding a migration.

### Core and campus scope

- `campuses`: `id`, `name`, `subdomain`, `location`, branding, timestamps.
- `profiles`: one row per `auth.users.id`, with display name, verified email, and timestamps.
- `campus_memberships`: `campus_id`, `user_id`, `role`, status. Unique `(campus_id, user_id, role)`; roles include student, club lead, vendor, and superadmin (superadmin may be global).
- Every campus-owned table has a non-null `campus_id` foreign key. Resolve campus from trusted host/configuration, never from an unvalidated body field.

### Product tables

- `clubs`: campus, name, category, description, recruitment state, images, lead ownership.
- `events` and `notices`: add when those features are moved off fixture data; campus-scoped and indexed by publication/start date.
- `opportunities`: normalized hackathons/perks feed data with source, external ID, active window, and deduplication key.
- `dhanda_businesses`: verified owner (`auth_user_id`), normalized unique owner email, business profile, campus, launch campaign reference.
- `dhanda_listings`: business/owner, campus, title, category, amount, status, image URL, created/updated timestamps.
- `dhanda_campaigns`: registration window, reward window, eligible campus, enabled flag, policy version.
- `dhanda_promotions`: business, campaign, selected placement tier, category, status, amount in paise, start/end, payment references, launch-bonus flag.
- `payments`: internal order, amount/currency, provider, provider order/payment IDs, state, related promotion/listing, timestamps. Unique provider IDs.
- `payment_webhook_events`: provider event ID unique, type, received/processed timestamps, payload or minimized audit fields. Makes webhook retries idempotent.
- `upload_objects` (optional): owner, campus, storage key, content type, size, linked entity. Store object keys; derive public URLs from storage configuration.

### Data rules and indexes

- Keep Supabase Auth as the identity source. Use `auth.users.id` as the owner key; verified email is an attribute, not the sole authorization credential.
- Store money as integer minor units (paise) plus ISO currency, not floating-point rupees.
- Use `timestamptz` in UTC and status enums/check constraints for lifecycle states.
- Add indexes for `(campus_id, status, created_at)` on listings, `(campus_id, status, starts_at, ends_at)` on promotions, and commonly queried membership/owner foreign keys.
- Enforce the free launch benefit with a unique constraint on `(business_id, campaign_id)` for launch-bonus promotions. The campaign window and tier chosen at registration must be snapshotted so later offer changes cannot alter an existing grant.
- Do not grant the browser a service-role key. Server-only API access uses the secret; any direct browser Supabase access must have explicit least-privilege RLS policies.
- Public reads must filter by campus and active/public status. Vendor/club writes must verify both role and ownership in the backend and, where direct database access is possible, in RLS too.

## Migration plan

1. **Stabilize the current app:** keep current Next.js pages and API URLs; define request/response contracts and identify each current fixture/in-memory array.
2. **Create the workspace:** move the current Next app to `frontend/`, set up workspace scripts, and ensure the frontend runs before extracting any API behavior.
3. **Extract backend foundation:** create the FastAPI service with Pydantic settings/environment validation, structured errors/logging, Supabase Auth/Storage adapters, PostgreSQL connection lifecycle, auth dependencies, and health/readiness endpoints. The foundation and clubs slice are now present. Run locally with `uvicorn app.main:app --reload` from `backend/`.
4. **Move one vertical slice at a time:** auth, clubs, Dhanda listings/business registration/business portal/promotions, opportunities, uploads, and payment webhooks are now served by FastAPI modules. Keep endpoint behavior covered with backend tests.
5. **Normalize schema safely:** inspect the existing initial migration and remote Supabase state; add forward-only migrations for missing profile/membership/events/notices/payments structures and constraints. Do not re-run a modified initial migration against an already-used database.
6. **Switch frontend calls:** use one typed API client with `NEXT_PUBLIC_API_BASE_URL`; remove direct server/database logic from UI code.
7. **Remove legacy setup:** remove old Next.js route handlers and Vite/Astro configuration after endpoint parity. Next.js route handlers have now been removed; URL compatibility is handled by rewrites.

## Important current-state notes

- The Next.js application now lives in `frontend/`; FastAPI lives in `backend/`. The unused Vite entry point and configuration have been removed; Next.js is the sole frontend runtime.
- The frontend has no API route handlers. `frontend/next.config.mjs` forwards versioned and legacy API paths to FastAPI. Backend feature modules own all API logic.
- Database migrations and the existing seed script live in `backend/db/`. The initial migration contains campuses, clubs, Dhanda businesses/listings/campaigns/promotions, payment events, and a gated DB smoke-test table. Extend the database with forward-only migrations rather than editing an already-applied migration.
- Supabase and Razorpay credentials should stay in separate frontend/backend environment files. Only the public API base URL and explicitly public Supabase publishable key may be exposed to the browser.

## Completion checks for the restructure

- Frontend can build and run without importing backend-only modules or secrets.
- FastAPI backend can run and test without importing React/Next UI code; its OpenAPI document matches the published API contract.
- Every endpoint has validation, explicit auth/access policy, campus scope, and a service/repository boundary.
- Migrations apply to a fresh database and upgrade an existing configured Supabase database.
- Existing Dhanda launch-offer, payment idempotency, and upload ownership behaviors have focused automated tests.
- No production route silently falls back to in-memory fixture data when the database is unavailable.
