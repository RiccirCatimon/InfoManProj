# Hope, Inc. HR System — User Manual
**Version:** 1.0 (Sprint 3 Final)  
**Date:** May 12, 2026  

---

## 1. Getting Started

### 1.1 Accessing the System
Navigate to the production URL. You will be greeted by the Login page.

### 1.2 Authentication
The system supports two methods of authentication:
- **Email/Password**: Standard registration and login.
- **Google OAuth**: One-click sign-in using your Google account.

### 1.3 User Roles & Activation
New accounts start with limited access. An **Admin** or **Superadmin** must activate your account and assign the appropriate role:
- **USER**: General HR staff (Can view active records, cannot delete/recover).
- **ADMIN**: HR Manager (Full CRUD access, can manage users, except Superadmins).
- **SUPERADMIN**: System Owner (Unrestricted access, protected from all modifications).

---

## 2. Employee Management

### 2.1 Employee Registry
The main list of employees.
- **Search**: Use the search bar to filter by name or Employee Number.
- **Add Employee**: Click "＋ Add Employee" to register a new hire.
- **Status Gating**: Only Admins can see the creation/update stamps and status of inactive employees.

### 2.2 Employee Profile
Click any row in the registry to view the full profile.
- **Job History**: A chronological list of all job assignments and salary changes.
- **Promotion/Transfer**: Use "Add Record" in the Job History panel to record a change in role or department.

---

## 3. Organizational Setup

### 3.1 Jobs
Manage the standard job titles used in the company.
- Each job has a unique **Job Code**.
- Soft-deleting a job will mark it as INACTIVE but will not delete historical records.

### 3.2 Departments
Manage company divisions.
- Each department has a unique **Dept Code**.

---

## 4. Reports & Analytics

Access the **Reports** section from the sidebar to view:
- **Headcount by Dept**: Real-time distribution of staff.
- **Salary Summary**: Min/Max/Avg salary benchmarks per role.
- **Employee History**: Full audit trail for a selected individual.

---

## 5. Administration (Admin Only)

### 5.1 User Management
- **Activation**: Toggle user status between ACTIVE and INACTIVE.
- **SUPERADMIN Protection**: Superadmin accounts cannot be deactivated or modified by regular Admins. A lock icon 🔒 indicates protected rows.

### 5.2 Deleted Items
A centralized recycle bin for all soft-deleted records.
- Admins can **Recover** records to restore them to the main system.
- Records are categorized by type (Employees, Jobs, etc.).

---

## 6. Business Rules & Protection

- **Soft Delete**: No data is ever permanently deleted from the database.
- **RLS Enforcement**: Every database query is checked against your permissions (17 unique rights).
- **Cascade Logic**: Deactivating an employee automatically deactivates their entire job history.

---
© 2026 Hope, Inc. - Human Resource Information System
