# Sprint 1 Log — Project Setup & Auth

**Dates**: Week 1 - 2
**Theme**: Project setup, full HR database initialization, authentication.

## Tasks Completed
- [x] GitHub repository created with dev/main strategy.
- [x] Vite + React 18 + Tailwind CSS scaffolded.
- [x] Supabase client initialized.
- [x] ProtectedRoute wired for auth blocking.
- [x] All 7 placeholder pages created and routed.
- [x] Login (Email/Google) and Register pages implemented.
- [x] Database seeded with 31 employees, 8 depts, 14 jobs, 54 JH rows.
- [x] 17 rights and SUPERADMIN account provisioned.
- [x] Login guard (ACTIVE check) implemented.

## Blockers & Resolutions
- **Blocker**: Google OAuth redirecting to localhost in production.
- **Resolution**: Updated Supabase Site URL and redirect patterns in the dashboard.

## Next Sprint Goals
- Implement full CRUD for all 4 HR modules.
- Enforce 17 rights across the UI.
- Implement soft-delete cascade triggers.
