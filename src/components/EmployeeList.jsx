import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('employee')
        .select('*')
        .order('empno')

      if (error) throw error
      setEmployees(data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Loading employees...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        Error: {error}
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Navigation Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #ddd'
      }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>
          Hope, Inc. HR System
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user?.email}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <h2 style={{ marginBottom: '1rem' }}>Employees</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          border: '1px solid #ddd'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Emp No</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Birth Date</th>
              <th style={thStyle}>Hire Date</th>
              <th style={thStyle}>Sep Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empno} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{emp.empno}</td>
                <td style={tdStyle}>{emp.lastname}</td>
                <td style={tdStyle}>{emp.firstname}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{emp.gender}</td>
                <td style={tdStyle}>{emp.birthdate}</td>
                <td style={tdStyle}>{emp.hiredate}</td>
                <td style={tdStyle}>{emp.sepdate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Total Employees: {employees.length}
      </p>
    </div>
  )
}

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  border: '1px solid #ddd'
}

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd'
}

export default EmployeeList