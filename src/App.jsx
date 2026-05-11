import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './pages/DepartmentList';
import JobList from './pages/JobList';
import JobHistory from './pages/JobHistory';
import AdminModule from './pages/AdminModule';
import DeletedItems from './pages/Deleteditems';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {user && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {user && <Sidebar />}
        <main className="flex-1 p-6 overflow-auto bg-white">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><DepartmentList /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
            <Route path="/job-history" element={<ProtectedRoute><JobHistory /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminModule /></ProtectedRoute>} />
            <Route path="/deleted-items" element={<ProtectedRoute><DeletedItems /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}