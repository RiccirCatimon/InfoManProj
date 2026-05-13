# 🏢 Hope, Inc. Human Resource System

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> A state-of-the-art HR Management Solution built for Hope, Inc. ensuring security, auditability, and seamless employee lifecycle management.

---

## ✨ Features

### 🔐 Granular Access Control
- **17 Distinct Rights**: Precise control over Add, Edit, Delete, and Admin functions.
- **Role-Based Security**: Dynamic UI gating and Database-level Row-Level Security (RLS).
- **SUPERADMIN Protection**: Immutable core admin account to prevent system lockout.

### 📝 Auditability & Integrity
- **The "Stamp" System**: Every modification is tagged with `ACTION-USERID-DATE`.
- **Soft-Delete Architecture**: Zero data loss policy using `record_status = 'INACTIVE'`.
- **Cascading Logic**: Automated deactivation of dependent records (e.g., Job History) upon employee deactivation.

### 📊 Professional HR Reporting
- **Headcount Analytics**: Real-time breakdown by department.
- **Salary Insights**: Min, Max, and Average salary summaries per position.
- **Career Tracking**: Comprehensive chronological history of all employee movements.

### 🔑 Modern Authentication
- Integrated **Google OAuth 2.0** for enterprise-grade login.
- Traditional Email/Password fallback.
- Active account verification on every login attempt.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **Supabase Project** with the provided SQL schema applied.

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd InfoManProj-fixed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root:
   ```env
   VITE_SUPABASE_URL=https://jekadekuitutdasisonc.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── docs/               # System documentation & Sprint logs
│   ├── sql/            # SQL Migrations & RLS Policies
│   ├── USER-MANUAL.md  # Detailed operator guide
│   └── ERD.md          # Database Entity Relationship Diagram
├── src/
│   ├── lib/            # Supabase clients & Service layer
│   ├── context/        # Auth & Rights state management
│   ├── components/     # Reusable UI components
│   └── pages/          # Feature modules (Employees, Jobs, Depts, Admin)
└── public/             # Static assets
```

## 🔗 Live Resources
- **Production URL**: [https://infoman-proj-fixed.vercel.app](https://infoman-proj-fixed.vercel.app) *(Update with actual if different)*
- **Database**: [Supabase Dashboard](https://supabase.com/dashboard/project/jekadekuitutdasisonc)

---

## 🤝 Contribution & PRs
We follow a strict `dev` -> `main` strategy. All pull requests must follow the [PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md).
See the full [Pull Request Log](docs/PULL_REQUESTS.md) for project history.

---
*Developed for Hope, Inc. - 2026*
