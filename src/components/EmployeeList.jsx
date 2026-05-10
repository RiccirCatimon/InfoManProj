import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RightsProvider } from './context/RightsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './components/EmployeeList';
import ProtectedRoute from './components/ProtectedRoute';
import { useRights, RIGHTS } from './hooks/useRights';

// Gumawa tayo ng hiwalay na component para sa Navigation para gumana ang useRights
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
      
      {/* Lalabas lang ang Employees link kung may EMP_VIEW right */}
      {hasRight(RIGHTS.EMP_VIEW) && (
        <Link to="/employees" style={{ textDecoration: 'none', color: '#007bff' }}> Employees </Link>
      )}

      {/* Lalabas lang ang Audit Stamp link kung may STAMP_VIEW right */}
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
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div style={{ padding: '2rem' }}>
                    <h1>Welcome to Hope, Inc. HR System</h1>
                    <p>Gamitin ang navigation sa taas para mag-check ng employees.</p>
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
                    <p>Dito makikita ang mga logs sa susunod na task.</p>
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