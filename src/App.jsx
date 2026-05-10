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
          <Link title="Employees" to="/employees" className="hover:text-blue-500">Employees</Link>
          <Link title="Jobs" to="/jobs" className="hover:text-blue-500">Jobs</Link>
          <Link title="Departments" to="/departments" className="hover:text-blue-500">Departments</Link>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          
          {/* JOB MODULE */}
          <Route path="/jobs" element={
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Job Management</h2>
                {/* Gating for Add Job */}
                {rights['JOB_ADD'] && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Add Job</button>
                )}
              </div>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Job Title</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Software Engineer</td>
                    <td className="p-2 border">
                      {/* Gating for Edit/Delete Job */}
                      {rights['JOB_EDIT'] && <button className="text-blue-500 mr-2">Edit</button>}
                      {rights['JOB_DEL'] && <button className="text-red-500">Delete</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          } />

          {/* DEPARTMENT MODULE */}
          <Route path="/departments" element={
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Departments</h2>
                {/* Gating for Add Dept */}
                {rights['DEPT_ADD'] && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Add Dept</button>
                )}
              </div>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Dept Name</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">IT Department</td>
                    <td className="p-2 border">
                      {/* Gating for Edit/Delete Dept */}
                      {rights['DEPT_EDIT'] && <button className="text-blue-500 mr-2">Edit</button>}
                      {rights['DEPT_DEL'] && <button className="text-red-500">Delete</button>}
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