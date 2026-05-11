import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RightsProvider } from './context/UserRightsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import EmployeeList from './components/EmployeeList';
import { useRights, RIGHTS } from './hooks/useRights';

function Navigation() {
  const { hasRight } = useRights();

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      padding: '1rem', 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      marginBottom: '1rem' 
    }}>
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}> Home </Link>
      
      {hasRight(RIGHTS.EMP_VIEW) && (
        <Link to="/employees" style={{ textDecoration: 'none', color: '#007bff' }}> Employees </Link>
      )}

      {hasRight(RIGHTS.STAMP_VIEW) && (
        <Link to="/audit-stamp" style={{ textDecoration: 'none', color: '#007bff' }}> Audit Stamp </Link>
      )}
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <RightsProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div style={{ padding: '2rem' }}>
                    <h1>Welcome to Hope, Inc. HR System</h1>
                    <p>Use the navigation above to manage records.</p>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit-stamp"
              element={
                <ProtectedRoute>
                  <div style={{ padding: '2rem' }}>
                    <h2>Audit Stamp Page</h2>
                    <p>Logs and audit trails for Sprint 3.</p>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </RightsProvider>
    </AuthProvider>
  );
}

export default App;