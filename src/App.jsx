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
      {/* NAVIGATION SECTION (PR-04) */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex gap-4">
          {rights['EMP_VIEW'] && (
            <Link to="/employees" className="hover:text-blue-500 font-medium text-gray-700">Employees</Link>
          )}
          {rights['JOB_VIEW'] && (
            <Link to="/jobs" className="hover:text-blue-500 font-medium text-gray-700">Jobs</Link>
          )}
          {rights['DEPT_VIEW'] && (
            <Link to="/departments" className="hover:text-blue-500 font-medium text-gray-700">Departments</Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {rights['STAMP_VIEW'] && (
            <span className="text-xs text-gray-400 italic bg-gray-50 p-1 rounded border">
              System Stamp: {new Date().toLocaleTimeString()}
            </span>
          )}
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          
          {/* JOB MANAGEMENT (PR-03) */}
          <Route path="/jobs" element={
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-700">Job Management</h2>
                {rights['JOB_ADD'] && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded text-sm">+ Add Job</button>
                )}
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600">
                    <th className="p-3 border">Job Title</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Software Engineer</td>
                    <td className="p-3 border text-center">
                      {rights['JOB_EDIT'] && <button className="text-blue-500 hover:underline mr-3 font-medium">Edit</button>}
                      {rights['JOB_DEL'] && <button className="text-red-500 hover:underline font-medium">Delete</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          } />

          {/* DEPARTMENTS (PR-03) */}
          <Route path="/departments" element={
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-700">Departments</h2>
                {rights['DEPT_ADD'] && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded text-sm">+ Add Dept</button>
                )}
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600">
                    <th className="p-3 border">Dept Name</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">IT Department</td>
                    <td className="p-3 border text-center">
                      {rights['DEPT_EDIT'] && <button className="text-blue-500 hover:underline mr-3 font-medium">Edit</button>}
                      {rights['DEPT_DEL'] && <button className="text-red-500 hover:underline font-medium">Delete</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          } />

          <Route path="*" element={<Navigate to="/employees" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;