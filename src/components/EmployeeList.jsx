import React, { useState, useEffect } from 'react';
import { employeeService } from '../lib/employeeService';
import { useUserRights } from '../hooks/useRights';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useUserRights();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        {isAdmin && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Employee
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Department</th>
              {isAdmin && <th className="px-4 py-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-4 py-2 border">{emp.first_name} {emp.last_name}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.departments?.department_name}</td>
                {isAdmin && (
                  <td className="px-4 py-2 border">
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;