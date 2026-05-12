# Sprint 2 Log — CRUD & Rights Enforcement

**Dates**: Week 3 - 4
**Theme**: Full CRUD, rights enforcement, soft-delete cascade, visibility rules.

## Tasks Completed
- [x] Service functions for Employee, JH, Job, and Dept (CRUD + Recover).
- [x] Soft-delete cascade (Employee -> JH) logic implemented.
- [x] UserRightsContext (17 rights) at app level.
- [x] UI button gating (ADD/EDIT/DEL) based on rights.
- [x] Stamp column gating (hidden from USER).
- [x] EmployeeListPage with current job view.
- [x] Deleted Items Page with 4-tab panel and recovery logic.

## Blockers & Resolutions
- **Blocker**: RLS policies for `recover` were complex.
- **Resolution**: Implemented specific UPDATE policies for `record_status` changes for ADMIN/SUPERADMIN roles.

## Next Sprint Goals
- Admin module (User Management).
- HR Reports (Headcount, Salary, History).
- Production deployment and final audit.
