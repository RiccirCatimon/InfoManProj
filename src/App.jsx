import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Login from './pages/Login'
import Register from './pages/Register'
import EmployeeList from './components/EmployeeList'
import UserManagement from './pages/UserManagement'
import EmployeeHistory from './pages/EmployeeHistory'
import Reports from './pages/Reports'
import './App.css'

// Robust Protected Route wrapper (TEMPORARILY BYPASSED FOR TESTING)
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  // NOTE: Bypassing auth check muna to diagnose the white screen issue.
  // If we bypass and the screen renders, your Supabase connection/session is the culprit.
  return children; 

  /* // Original auth logic (Uncomment this later once the UI loads successfully):
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600 animate-pulse">Loading...</div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
  */
}

// Layout Wrapper component using <Outlet /> to render nested routes
function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Nested pages render here */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected HR Dashboard Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Child routes matching the navigation paths */}
        <Route path="/" element={<Navigate to="/user-management" replace />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/history" element={<EmployeeHistory />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div className="text-gray-500 p-6">Page Not Found</div>} />
    </Routes>
  )
}

export default App