import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRightsProvider } from './context/UserRightsContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './pages/DepartmentList';
import JobList from './pages/JobList';
import JobHistory from './pages/JobHistory';
import AdminModule from './pages/AdminModule';
import DeletedItems from './pages/DeletedItems';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      {user && <Navbar />}
      <div className="main-layout">
        {user && <Sidebar />}
        <main className={`content ${!user ? 'full-width' : ''}`}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><DepartmentList /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
            <Route path="/job-history" element={<ProtectedRoute><JobHistory /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminModule /></ProtectedRoute>} />
            <Route path="/deleted-items" element={<ProtectedRoute><DeletedItems /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserRightsProvider>
          <AppContent />
        </UserRightsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;