import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useRights } from './context/UserRightsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './components/EmployeeList';

function App() {
  const { user, logout } = useAuth();
  const { rights } = useRights();

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
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex gap-4">
          {rights['EMP_VIEW'] && (
            <Link to="/employees" className="hover:text-blue-500 font-medium">Employees</Link>
          )}
          {rights['JOB_VIEW'] && (
            <Link to="/jobs" className="hover:text-blue-500 font-medium">Jobs</Link>
          )}
          {rights['DEPT_VIEW'] && (
            <Link to="/departments" className="hover:text-blue-500 font-medium">Departments</Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {rights['STAMP_VIEW'] && (
            <span className="text-xs text-gray-400 italic bg-gray-50 p-1 rounded border">
              System Stamp: {new Date().toLocaleTimeString()}
            </span>
          )}
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/jobs" element={<div className="p-4 bg-white rounded shadow">Job Management Section</div>} />
          <Route path="/departments" element={<div className="p-4 bg-white rounded shadow">Departments Section</div>} />
          <Route path="*" element={<Navigate to="/employees" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;