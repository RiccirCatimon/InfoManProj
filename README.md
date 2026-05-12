# Hope, Inc. Human Resource System

A comprehensive HR management web application built with React, Vite, and Supabase.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase Project

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd InfoManProj-fixed
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Development
```bash
npm run dev
```

## 🛠️ Features
- **Rights Management**: 17 granular rights assigned to users.
- **Audit Trail**: Action-tracking via the `stamp` column.
- **Soft-Delete**: No hard deletes; records are marked `INACTIVE`.
- **HR Reports**: Headcount by Dept, Salary Summary, and Employee History.
- **Auth**: Email/Password and Google OAuth login.

## 📁 Project Structure
- `/src/lib`: Service functions and Supabase client.
- `/src/pages`: UI pages and modules.
- `/docs`: User Manual, ERD, and Sprint Logs.
- `/docs/sql`: SQL migrations and RLS policies.

## 🔗 Production Links
- **Vercel**: [Your Vercel URL]
- **Supabase**: [Your Supabase Project URL]
