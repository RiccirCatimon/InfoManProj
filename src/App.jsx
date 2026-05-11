import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import EmployeeList from './components/EmployeeList'
import EmployeeHistory from './pages/EmployeeHistory'
import Reports from './pages/Reports'
import UserManagement from './pages/UserManagement'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600 animate-pulse">Loading...</div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected HR Dashboard Routes */}
      <Route 
        path="/*" 
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-gray-100 overflow-hidden">
              <Sidebar />

              <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                  <Routes>
                    <Route path="/" element={<Navigate to="/user-management" replace />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/history" element={<EmployeeHistory />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<div className="text-gray-500">Page Not Found</div>} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App