import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useRights } from './context/UserRightsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './components/EmployeeList';

function App() {
  const { user, logout } = useAuth();
  const { rights } = useRights();

  // Redirect to Login if not authenticated
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SIDEBAR / NAVIGATION GATING */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {rights['EMP_VIEW'] && (
            <Link to="/employees" className="hover:text-blue-500 font-medium text-gray-700">Employees</Link>
          )}
          {rights['JOB_VIEW'] && (
            <Link to="/jobs" className="hover:text-blue-500 font-medium text-gray-700">Jobs</Link>
          )}
          {rights['DEPT_VIEW'] && (
            <Link to="/departments" className="hover:text-blue-500 font-medium text-gray-700">Departments</Link>
          )}

          {/* PR-01: ADMIN MODULE GATING */}
          {rights['ADMIN_VIEW'] && (
            <Link to="/admin" className="bg-purple-50 text-purple-700 px-3 py-1 rounded border border-purple-200 hover:bg-purple-100 font-bold transition-all">
              🛡️ Admin
            </Link>
          )}

          {/* PR-01: DELETED ITEMS GATING */}
          {rights['VIEW_DELETED'] && (
            <Link to="/deleted-items" className="text-red-600 hover:text-red-800 font-medium text-sm border-l pl-4 border-gray-300">
              🗑️ Deleted Items
            </Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* SYSTEM STAMP GATING */}
          {rights['STAMP_VIEW'] && (
            <span className="text-xs text-gray-400 italic bg-gray-50 p-1 rounded border">
              System Stamp: {new Date().toLocaleTimeString()}
            </span>
          )}
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          
          {/* PLACEHOLDERS PARA SA MGA MODULES */}
          <Route path="/jobs" element={<div className="bg-white p-6 rounded shadow">Job Management Section</div>} />
          <Route path="/departments" element={<div className="bg-white p-6 rounded shadow">Departments Section</div>} />
          
          {/* ADMIN & DELETED ROUTES */}
          <Route path="/admin" element={
            <div className="bg-purple-50 p-6 rounded border-2 border-purple-200 shadow-lg">
              <h1 className="text-2xl font-bold text-purple-900">Admin Control Panel</h1>
              <p className="text-purple-700">Strictly for authorized personnel only.</p>
            </div>
          } />
          
          <Route path="/deleted-items" element={
            <div className="bg-red-50 p-6 rounded border-2 border-red-200 shadow-lg">
              <h1 className="text-2xl font-bold text-red-900">Trash Bin / Recovery</h1>
              <p className="text-red-700">List of soft-deleted records.</p>
            </div>
          } />

          <Route path="*" element={<Navigate to="/employees" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;