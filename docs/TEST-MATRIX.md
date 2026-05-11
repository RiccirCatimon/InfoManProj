# Sprint 3 — End-to-End Test Matrix
**Tester:** Henry Laurente Jr.  
**Branch:** test/sprint3-e2e-production  
**Environment:** Production (Vercel)  
**Status:** 🔄 In Progress

---

## Test Summary
| Total Cases | Passed | Failed | Blocked |
|-------------|--------|--------|---------|
| 51          | -      | -      | -       |

---

## MODULE 1 — Authentication (TC-001 to TC-010)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-001 | SUPERADMIN can log in via Google | SUPERADMIN | Redirected to dashboard | - | 🔲 |
| TC-002 | ADMIN can log in via Google | ADMIN | Redirected to dashboard | - | 🔲 |
| TC-003 | EMPLOYEE can log in via Google | EMPLOYEE | Redirected to dashboard | - | 🔲 |
| TC-004 | Invalid account is blocked | N/A | Access denied / error shown | - | 🔲 |
| TC-005 | Google redirect URL resolves correctly on Vercel | ALL | No redirect error | - | 🔲 |
| TC-006 | Logged-out user cannot access dashboard via URL | N/A | Redirected to login | - | 🔲 |
| TC-007 | Session persists on page refresh | ALL | Still logged in | - | 🔲 |
| TC-008 | Logout clears session | ALL | Redirected to login | - | 🔲 |
| TC-009 | SUPERADMIN sees full sidebar after login | SUPERADMIN | All links visible | - | 🔲 |
| TC-010 | EMPLOYEE sees limited sidebar after login | EMPLOYEE | Admin links hidden | - | 🔲 |

---

## MODULE 2 — Sidebar & Navigation Gating (TC-011 to TC-020)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-011 | "Admin" link visible to SUPERADMIN | SUPERADMIN | Link visible | - | 🔲 |
| TC-012 | "Admin" link visible to ADMIN | ADMIN | Link visible | - | 🔲 |
| TC-013 | "Admin" link hidden from EMPLOYEE | EMPLOYEE | Link not visible | - | 🔲 |
| TC-014 | "Deleted Items" visible to SUPERADMIN | SUPERADMIN | Link visible | - | 🔲 |
| TC-015 | "Deleted Items" hidden from ADMIN | ADMIN | Link not visible | - | 🔲 |
| TC-016 | "Deleted Items" hidden from EMPLOYEE | EMPLOYEE | Link not visible | - | 🔲 |
| TC-017 | EMPLOYEE cannot access /admin via direct URL | EMPLOYEE | Blocked / redirected | - | 🔲 |
| TC-018 | ADMIN cannot access /deleted-items via direct URL | ADMIN | Blocked / redirected | - | 🔲 |
| TC-019 | Active nav link is highlighted correctly | ALL | Correct highlight | - | 🔲 |
| TC-020 | Sidebar renders correctly on mobile | ALL | No overflow/breaks | - | 🔲 |

---

## MODULE 3 — Admin User Management (TC-021 to TC-030)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-021 | User list loads all users | SUPERADMIN | All users displayed | - | 🔲 |
| TC-022 | SUPERADMIN row has disabled action buttons | SUPERADMIN | Buttons greyed out | - | 🔲 |
| TC-023 | SUPERADMIN row shows "Protected" tooltip | SUPERADMIN | Tooltip visible on hover | - | 🔲 |
| TC-024 | ADMIN can activate an EMPLOYEE | ADMIN | Status changes to Active | - | 🔲 |
| TC-025 | ADMIN can deactivate an EMPLOYEE | ADMIN | Status changes to Inactive | - | 🔲 |
| TC-026 | ADMIN cannot activate/deactivate SUPERADMIN | ADMIN | API rejects request | - | 🔲 |
| TC-027 | API rejects deactivate request on SUPERADMIN | SUPERADMIN | 403/error returned | - | 🔲 |
| TC-028 | User status updates reflect immediately in UI | SUPERADMIN | No page reload needed | - | 🔲 |
| TC-029 | "No records found" shows when user list is empty | SUPERADMIN | Message displayed | - | 🔲 |
| TC-030 | User management page is mobile responsive | SUPERADMIN | No layout breaks | - | 🔲 |

---

## MODULE 4 — Reports Module (TC-031 to TC-040)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-031 | Headcount chart loads correctly | SUPERADMIN | Chart renders with data | - | 🔲 |
| TC-032 | Headcount chart shows correct department data | SUPERADMIN | Matches DB values | - | 🔲 |
| TC-033 | Salary summary table loads correctly | SUPERADMIN | Table renders | - | 🔲 |
| TC-034 | Salary summary shows correct figures | SUPERADMIN | Matches DB values | - | 🔲 |
| TC-035 | Employee History is in chronological order | SUPERADMIN | Oldest to newest | - | 🔲 |
| TC-036 | Reports page is accessible to SUPERADMIN | SUPERADMIN | Page loads | - | 🔲 |
| TC-037 | Reports page is accessible to ADMIN | ADMIN | Page loads | - | 🔲 |
| TC-038 | Reports page blocked from EMPLOYEE | EMPLOYEE | Access denied | - | 🔲 |
| TC-039 | "No records found" shows on empty reports | SUPERADMIN | Message displayed | - | 🔲 |
| TC-040 | Reports page is mobile responsive | SUPERADMIN | No layout breaks | - | 🔲 |

---

## MODULE 5 — Soft-Delete Cascade (TC-041 to TC-046)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-041 | Deleting employee soft-deletes (row still in DB) | SUPERADMIN | Row exists, is_deleted=true | - | 🔲 |
| TC-042 | Deleted employee disappears from main list | SUPERADMIN | Not shown in employee list | - | 🔲 |
| TC-043 | Deleted employee appears in "Deleted Items" | SUPERADMIN | Visible in deleted view | - | 🔲 |
| TC-044 | Cascade: related jobHistory records also soft-deleted | SUPERADMIN | jobHistory rows marked deleted | - | 🔲 |
| TC-045 | Restoring employee re-shows them in main list | SUPERADMIN | Back in employee list | - | 🔲 |
| TC-046 | No hard DELETE command executes anywhere | SUPERADMIN | Confirmed with Avraigne's audit | - | 🔲 |

---

## MODULE 6 — Edge Cases & UI Polish (TC-047 to TC-051)

| ID | Description | Role Tested | Expected | Actual | Status |
|----|-------------|-------------|----------|--------|--------|
| TC-047 | "No records found" displays on all empty tables | ALL | Consistent message shown | - | 🔲 |
| TC-048 | Full app audit on mobile (375px width) | ALL | No broken layouts | - | 🔲 |
| TC-049 | All buttons have correct disabled states | ALL | No active buttons on protected rows | - | 🔲 |
| TC-050 | Page load time is acceptable on Vercel | ALL | Loads under 5 seconds | - | 🔲 |
| TC-051 | No console errors on any page | ALL | Clean browser console | - | 🔲 |

---

## Bugs Found
| Bug ID | Page | Description | Severity | Reported To | Status |
|--------|------|-------------|----------|-------------|--------|
| -      | -    | -           | -        | -           | -      |

---
*Last updated: [fill in date when testing]*
