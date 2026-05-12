# Presentation: Hope, Inc. HR System

## Slide 1: System Overview
- Web-based HR Management System
- Built for Hope, Inc. to manage core HR data: Employee, Job, Department, and Job History.
- Key Focus: Security, Auditability, and Rights Management.

## Slide 2: Tech Stack
- Frontend: React 18, Vite, Tailwind CSS.
- Backend: Supabase (PostgreSQL, Auth, RLS).
- Hosting: Vercel.

## Slide 3: Database Architecture
- 4 Core HR Tables.
- 5 Security/Rights Tables.
- 3 SQL Views for real-time reporting.
- Cascading Soft-Delete Triggers.

## Slide 4: Core Rule: No Hard Deletes
- The `DELETE` keyword is banned from the application.
- All deletions are "Soft-Deletes" via `record_status = 'INACTIVE'`.
- Cascade logic: Deactivating an employee automatically deactivates all their history records.

## Slide 5: Audit Trail (The Stamp)
- Every record includes a `stamp` field.
- Format: `ACTION-USERID-DATE`.
- Visible only to ADMIN and SUPERADMIN roles.
- Tracks exactly who modified what and when.

## Slide 6: Rights Management System
- 17 granular rights (e.g., `EMP_ADD`, `JH_EDIT`, `ADM_USER`).
- Rights are assigned per user per module.
- Checked dynamically at the UI level (button gating) and DB level (RLS).

## Slide 7: Employee Management Demo
- List view with current job assignments.
- Profile view with chronological job history.
- Granular controls for Adding/Editing/Deactivating.

## Slide 8: Admin Module & Superadmin Protection
- Centralized user management.
- Activation/Deactivation of staff accounts.
- SUPERADMIN Protection: Core admin account cannot be modified by anyone.

## Slide 9: HR Reports & Analytics
- Real-time Headcount by Department.
- Salary Summary (Min/Max/Avg) by Job position.
- Full Employee Career History tracking.

## Slide 10: Security: Row-Level Security (RLS)
- Data is protected at the database level.
- Even if the frontend is bypassed, Supabase rejects unauthorized queries based on the user's rights.

## Slide 11: Production Deployment
- Deployed to Vercel.
- Environment variables secured.
- Google OAuth 2.0 fully configured for production.

## Slide 12: Lessons Learned & Final Stats
- Total Pull Requests: 53+.
- 100% compliance with capstone requirements.
- Modular architecture allows for future scale.
