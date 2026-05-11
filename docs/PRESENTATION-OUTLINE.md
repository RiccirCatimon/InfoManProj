# Final Presentation — Slide Deck Outline
**Prepared by:** Juno Laurente  
**Slide Tool:** Google Slides / PowerPoint  
**Total Slides:** 12

---

## Slide 1 — Cover
- Project Title: InfoMan — Employee Information Management System
- Team: Riccir Catimon, Denverlee Felix, Avraigne Martinez, Gian Gallamos, Juno Laurente
- Course & Section: CIT221-18 / ITL221-18
- Date of Defense

## Slide 2 — Project Overview
- What the system does
- Who uses it (SUPERADMIN, ADMIN, EMPLOYEE roles)
- Problem it solves

## Slide 3 — Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend/DB: Supabase (PostgreSQL)
- Auth: Supabase Google OAuth
- Hosting: Vercel
- Version Control: GitHub

## Slide 4 — System Architecture
- Diagram: User → React Frontend → Supabase API → RLS → PostgreSQL
- Show the 3 user roles and their access levels

## Slide 5 — Database Design
- ERD overview
- Key tables: employees, jobHistory, departments
- Soft-delete pattern (is_deleted flag)

## Slide 6 — Security Model
- Row Level Security (RLS) policies
- SUPERADMIN protection (cannot be edited by anyone)
- No Hard Delete policy — audit proof

## Slide 7 — Demo: Authentication
- Screenshot: Google Login page
- Screenshot: Role-based redirect working
- Sidebar differences per role

## Slide 8 — Demo: Admin User Management
- Screenshot: User list
- Screenshot: Disabled buttons on SUPERADMIN row
- Screenshot: "Protected" tooltip

## Slide 9 — Demo: Reports Module
- Screenshot: Headcount chart
- Screenshot: Salary summary table
- Screenshot: Employee History view

## Slide 10 — QA Results
- 51-case test matrix summary table
- Pass rate (e.g. 49/51 passed)
- Bugs found and fixed

## Slide 11 — Lessons Learned
- What went well
- What was challenging
- What we'd do differently

## Slide 12 — Q&A / Thank You
- Live Vercel URL
- GitHub repo link
- Team photo (optional)
