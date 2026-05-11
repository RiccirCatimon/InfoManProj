import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useRights } from "../context/UserRightsContext";

const EmployeeList = () => {
  const { user } = useAuth();
  const { rights } = useRights();

  // Mock data para may makita ka sa screen
  const employees = [
    { id: 1, name: "Gian Gallamos", role: "Rights & Auth Specialist" },
    { id: 2, name: "Riccir Catimon", role: "Lead Developer" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        
        {/* GATING: Button is only visible if user has ADD right */}
        {rights['EMP_ADD'] && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            + Add New Employee
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{emp.id}</td>
                <td className="p-3 border-b font-medium">{emp.name}</td>
                <td className="p-3 border-b text-gray-600">{emp.role}</td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    {/* GATING: Edit/Delete buttons visible only with rights */}
                    {rights['EMP_EDIT'] && (
                      <button className="text-blue-500 hover:underline text-sm">Edit</button>
                    )}
                    {rights['EMP_DELETE'] && (
                      <button className="text-red-500 hover:underline text-sm">Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER INFO PARA SA PR-02 DOCUMENTATION */}
      <div className="mt-8 pt-4 border-t text-xs text-gray-400">
        Logged in as: <span className="font-bold text-gray-600">{user?.email}</span> | 
        Rights Level: <span className="text-green-600 font-bold uppercase">{rights['ADMIN_VIEW'] ? 'Admin' : 'Standard User'}</span>
      </div>
    </div>
  );
};

export default EmployeeList;