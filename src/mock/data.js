// src/mock/data.js

// ── System Users (for UserManagement page) ───────────────────────────────────
export const mockUsers = [
  { id: 'user1', username: 'riccir', email: 'riccir.catimon@hopehrs.com', user_type: 'SUPERADMIN', record_status: 'ACTIVE' },
  { id: 'user2', username: 'denver', email: 'denverlee.felix@hopehrs.com', user_type: 'ADMIN', record_status: 'ACTIVE' },
  { id: 'user3', username: 'jane', email: 'jane.doe@hopehrs.com', user_type: 'USER', record_status: 'ACTIVE' },
  { id: 'user4', username: 'john', email: 'john.smith@hopehrs.com', user_type: 'USER', record_status: 'INACTIVE' },
];

// ── Departments ───────────────────────────────────────────────────────────────
export const mockDepts = [
  { deptcode: 'IT', deptname: 'Information Technology', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { deptcode: 'HRD', deptname: 'Human Resources', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { deptcode: 'FIN', deptname: 'Finance', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { deptcode: 'MKT', deptname: 'Marketing', record_status: 'INACTIVE', stamp: 'DEACTIVATED-BY-SA 2025-03-15' },
];

// ── Jobs ─────────────────────────────────────────────────────────────────────
export const mockJobs = [
  { jobcode: 'DEV1', jobdesc: 'Software Developer', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { jobcode: 'OFF1', jobdesc: 'HR Officer', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { jobcode: 'ACC1', jobdesc: 'Accountant', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { jobcode: 'MGR1', jobdesc: 'Department Manager', record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2024-01-01' },
  { jobcode: 'SA1', jobdesc: 'Systems Analyst', record_status: 'INACTIVE', stamp: 'DEACTIVATED-BY-SA 2025-01-10' },
];

// ── HR Employees ──────────────────────────────────────────────────────────────
export const mockHREmployees = [
  {
    empno: '00001', lastname: 'Santos', firstname: 'Maria', gender: 'F',
    birthdate: '1990-05-14', hiredate: '2015-03-01', sepdate: null,
    record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2015-03-01',
    current_jobdesc: 'HR Officer', current_deptname: 'Human Resources',
  },
  {
    empno: '00002', lastname: 'Reyes', firstname: 'Jose', gender: 'M',
    birthdate: '1985-11-22', hiredate: '2013-07-15', sepdate: null,
    record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2013-07-15',
    current_jobdesc: 'Software Developer', current_deptname: 'Information Technology',
  },
  {
    empno: '00003', lastname: 'Cruz', firstname: 'Ana', gender: 'F',
    birthdate: '1992-08-30', hiredate: '2018-01-10', sepdate: null,
    record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2018-01-10',
    current_jobdesc: 'Accountant', current_deptname: 'Finance',
  },
  {
    empno: '00004', lastname: 'Garcia', firstname: 'Luis', gender: 'M',
    birthdate: '1978-02-18', hiredate: '2010-06-20', sepdate: '2024-12-31',
    record_status: 'INACTIVE', stamp: 'DEACTIVATED-00004-2024-12-31',
    current_jobdesc: 'Department Manager', current_deptname: 'Marketing',
  },
  {
    empno: '00005', lastname: 'Lim', firstname: 'Rachel', gender: 'F',
    birthdate: '1995-04-05', hiredate: '2022-09-01', sepdate: null,
    record_status: 'ACTIVE', stamp: 'INITIAL-SEED 2022-09-01',
    current_jobdesc: 'Software Developer', current_deptname: 'Information Technology',
  },
];

// ── Job History ───────────────────────────────────────────────────────────────
export const mockJobHistory = [
  { id: 1, empno: '00001', jobcode: 'OFF1', jobdesc: 'HR Officer', deptcode: 'HRD', deptname: 'Human Resources', effdate: '2015-03-01', salary: 28000, record_status: 'ACTIVE', stamp: 'INITIAL-SEED' },
  { id: 2, empno: '00002', jobcode: 'DEV1', jobdesc: 'Software Developer', deptcode: 'IT', deptname: 'Information Technology', effdate: '2013-07-15', salary: 35000, record_status: 'ACTIVE', stamp: 'INITIAL-SEED' },
  { id: 3, empno: '00002', jobcode: 'MGR1', jobdesc: 'Department Manager', deptcode: 'IT', deptname: 'Information Technology', effdate: '2020-01-01', salary: 55000, record_status: 'ACTIVE', stamp: 'PROMOTION' },
  { id: 4, empno: '00003', jobcode: 'ACC1', jobdesc: 'Accountant', deptcode: 'FIN', deptname: 'Finance', effdate: '2018-01-10', salary: 30000, record_status: 'ACTIVE', stamp: 'INITIAL-SEED' },
  { id: 5, empno: '00004', jobcode: 'MGR1', jobdesc: 'Department Manager', deptcode: 'MKT', deptname: 'Marketing', effdate: '2010-06-20', salary: 60000, record_status: 'INACTIVE', stamp: 'DEACTIVATED' },
  { id: 6, empno: '00005', jobcode: 'DEV1', jobdesc: 'Software Developer', deptcode: 'IT', deptname: 'Information Technology', effdate: '2022-09-01', salary: 33000, record_status: 'ACTIVE', stamp: 'INITIAL-SEED' },
];

// ── Report Mocks ─────────────────────────────────────────────────────────────
export const mockHeadcountByDept = [
  { deptcode: 'IT', deptname: 'Information Technology', headcount: 3 },
  { deptcode: 'HRD', deptname: 'Human Resources', headcount: 1 },
  { deptcode: 'FIN', deptname: 'Finance', headcount: 1 },
];

export const mockSalarySummaryByJob = [
  { jobcode: 'MGR1', jobdesc: 'Department Manager', min_salary: 55000, max_salary: 55000, avg_salary: 55000 },
  { jobcode: 'DEV1', jobdesc: 'Software Developer', min_salary: 33000, max_salary: 35000, avg_salary: 34000 },
  { jobcode: 'ACC1', jobdesc: 'Accountant', min_salary: 30000, max_salary: 30000, avg_salary: 30000 },
  { jobcode: 'OFF1', jobdesc: 'HR Officer', min_salary: 28000, max_salary: 28000, avg_salary: 28000 },
];