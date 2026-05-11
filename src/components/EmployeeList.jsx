import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import EmptyState from './EmptyState'
import { getEmployees } from '../../employeeService'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      // Calling the imported named function directly instead of using employeeService.getEmployees()
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'Failed to fetch employee list.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 font-medium mt-4">Loading employee roster...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-2xl max-w-xl mx-auto my-12">
        <div className="text-3xl mb-2">⚠️</div>
        <h3 className="text-lg font-bold text-red-800">Database Connection Error</h3>
        <p className="text-sm text-red-600 mt-1 mb-4">{error}</p>
        <button 
          onClick={fetchEmployees}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Retry Connection
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Employee Registry</h2>
          <p className="text-sm text-gray-500 mt-1">Review organizational hires, biological profile keys, and historic separation dates.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
          <span>＋</span> Add New Employee
        </button>
      </div>

      {/* Main UI Block with Custom Reusable Empty State */}
      {!employees || employees.length === 0 ? (
        <EmptyState 
          icon="👥"
          title="No Employees Found"
          description="There are currently no staff accounts registered in the database. Add an employee to populate the roster."
          actionLabel="+ Add New Employee"
          onActionClick={() => console.log("Open Add Employee modal")}
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Emp No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Birth Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hire Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sep Date</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr key={emp.empno} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{emp.empno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{emp.lastname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{emp.firstname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        emp.gender === 'M' ? 'bg-indigo-50 text-indigo-700' : 'bg-pink-50 text-pink-700'
                      }`}>
                        {emp.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.birthdate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.hiredate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.sepdate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Table Footer Stats Bar */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Total Headcount:</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">{employees.length} Employees</span>
          </div>
        </div>
      )}
    </div>
  )
}