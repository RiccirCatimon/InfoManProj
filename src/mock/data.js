// src/mock/data.js

// 1. Export your mock employees for UserManagement.jsx
export const mockEmployees = [
  {
    id: 1,
    name: "Riccir Catimon",
    email: "riccir.catimon@hopehrs.com",
    department: "Information Technology",
    role: "SUPERADMIN", // Triggers the secure lock and tooltip
    status: "Active"
  },
  {
    id: 2,
    name: "Denverlee Felix",
    email: "denverlee.felix@hopehrs.com",
    department: "Information Technology",
    role: "ADMIN",
    status: "Active"
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "jane.doe@hopehrs.com",
    department: "Human Resources",
    role: "USER",
    status: "Active"
  },
  {
    id: 4,
    name: "John Smith",
    email: "john.smith@hopehrs.com",
    department: "Finance",
    role: "USER",
    status: "Inactive"
  }
];

// 2. Export mockHistory so EmployeeHistory.jsx doesn't crash the app!
export const mockHistory = [
  {
    id: 1,
    employeeId: 2,
    employeeName: "Denverlee Felix",
    action: "Role Escalated to Admin",
    timestamp: "May 11, 2026 - 08:30 PM",
    performedBy: "Riccir Catimon (Superadmin)"
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Jane Doe",
    action: "Profile Registered",
    timestamp: "May 10, 2026 - 10:15 AM",
    performedBy: "System Registration"
  }
];