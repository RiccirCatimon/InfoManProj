import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Imports (Siguraduhin na nandoon ang files o gawa ka ng placeholder)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

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
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            
            {/* Temporary Placeholder para sa ibang routes para hindi mag-error */}
            <Route path="/employees" element={user ? <div className="p-4">Employee Page</div> : <Navigate to="/login" />} />
            <Route path="/user-management" element={user ? <div className="p-4">User Management</div> : <Navigate to="/login" />} />
            <Route path="/history" element={user ? <div className="p-4">History Page</div> : <Navigate to="/login" />} />
            <Route path="/reports" element={user ? <div className="p-4">Reports Page</div> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}