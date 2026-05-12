// src/App.jsx — Sprint 2 & 3 full routing + route guard
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useRights, RIGHTS } from './context/UserRightsContext'
import { SUPABASE_CONFIGURED } from './lib/supabase'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EmployeeListPage from './pages/EmployeeListPage'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import JobListPage from './pages/JobListPage'
import DeptListPage from './pages/DeptListPage'
import DeletedItemsPage from './pages/DeletedItemsPage'
import UserManagementPage from './pages/UserManagementPage'
import HeadcountByDeptPage from './pages/HeadcountByDeptPage'
import SalaryReportPage from './pages/SalaryReportPage'
import EmployeeHistoryReportPage from './pages/EmployeeHistoryReportPage'
import Reports from './pages/Reports'

// Route guard: blocks USER role from accessing ADMIN/SUPERADMIN only routes
function AdminRoute({ children }) {
  const { user } = useAuth()
  // Fix: Check user_type from database, not metadata
  const type = user?.user_type ?? 'USER'
  if (type === 'USER') return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-gray-500 text-lg">Loading…</div>
    </div>
  )

  return (
    <>
      {!SUPABASE_CONFIGURED && (
        <div style={{ background: '#fef9c3', borderBottom: '1px solid #fde047', padding: '6px 16px', textAlign: 'center', fontSize: '0.8rem', color: '#713f12' }}>
          ⚠️ <strong>Demo Mode</strong> — No Supabase credentials. Login: <strong>admin@hopehrs.com / admin123</strong> or <strong>user@hopehrs.com / user123</strong>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-gray-100">
        {user && <Navbar />}
        <div className="flex flex-1 overflow-hidden">
          {user && <Sidebar />}
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <Routes>
              {/* Auth */}
              <Route path="/login"    element={!user ? <Login />    : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

              {/* Dashboard */}
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />

              {/* HR Modules — Sprint 2 */}
              <Route path="/employees"     element={user ? <EmployeeListPage />   : <Navigate to="/login" />} />
              <Route path="/employees/:empno" element={user ? <EmployeeDetailPage /> : <Navigate to="/login" />} />
              <Route path="/jobs"          element={user ? <JobListPage />        : <Navigate to="/login" />} />
              <Route path="/departments"   element={user ? <DeptListPage />       : <Navigate to="/login" />} />

              {/* Deleted Items — ADMIN/SUPERADMIN only (Sprint 2 route guard) */}
              <Route path="/deleted-items" element={user ? <AdminRoute><DeletedItemsPage /></AdminRoute> : <Navigate to="/login" />} />

              {/* Admin Module — Sprint 3 */}
              <Route path="/user-management" element={user ? <AdminRoute><UserManagementPage /></AdminRoute> : <Navigate to="/login" />} />

              {/* Reports — ADMIN/SUPERADMIN only for security */}
              <Route path="/reports"                   element={user ? <AdminRoute><Reports /></AdminRoute>                    : <Navigate to="/login" />} />
              <Route path="/reports/headcount"         element={user ? <AdminRoute><HeadcountByDeptPage /></AdminRoute>        : <Navigate to="/login" />} />
              <Route path="/reports/salary"            element={user ? <AdminRoute><SalaryReportPage /></AdminRoute>           : <Navigate to="/login" />} />
              <Route path="/reports/employee-history"  element={user ? <AdminRoute><EmployeeHistoryReportPage /></AdminRoute>  : <Navigate to="/login" />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}
