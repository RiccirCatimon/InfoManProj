# Soft-Delete Cascade Verification Report
**Tester:** Juno Laurente  
**Sprint:** 3  
**Environment:** Production (Vercel)  
**Status:** 🔄 Pending — Waiting for Live Deployment

---

## What This Report Verifies
This document proves that the Soft-Delete Cascade works correctly
in production. No hard DELETE commands exist anywhere in the project
(confirmed by Avraigne's docs/final-rls-audit).

---

## Cascade Test Results

| Step | Action | Expected DB Result | Verified? |
|------|--------|--------------------|-----------|
| 1 | Delete an Employee from the UI | `is_deleted = true` on employee row | 🔲 Pending |
| 2 | Check employee's jobHistory rows | All related rows also `is_deleted = true` | 🔲 Pending |
| 3 | Check main employee list | Deleted employee no longer appears | 🔲 Pending |
| 4 | Check Deleted Items page | Deleted employee IS visible here | 🔲 Pending |
| 5 | Restore the employee | Employee reappears in main list | 🔲 Pending |
| 6 | Check jobHistory after restore | Related rows restored too | 🔲 Pending |

---

## Evidence
> Screenshots to be added after live deployment

---

## Sign-off
- [ ] Tested by: Juno Laurente  
- [ ] DB confirmed by: Avraigne Martinez  
- [ ] Date: ___________
