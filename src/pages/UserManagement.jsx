import { mockEmployees } from '../mock/data'
import EmptyState from '../components/EmptyState'

export default function UserManagement() {
  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system user access roles, registration details, and account status.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-500/10 transition-all flex items-center gap-2">
          <span>＋</span> Add User Account
        </button>
      </div>

      {/* Reusable Empty State Validation */}
      {!mockEmployees || mockEmployees.length === 0 ? (
        <EmptyState 
          icon="🔑"
          title="No User Accounts Found"
          description="There are currently no administrative or staff user profiles registered in the database."
          actionLabel="+ Add User Account"
          onActionClick={() => console.log("Open Add User Modal")}
        />
      ) : (
        /* Main Table Card */
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Account Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-700">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{emp.name}</div>
                          <div className="text-xs text-gray-500">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        emp.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          emp.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></span>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {emp.role === 'SUPERADMIN' ? (
                        <div className="relative inline-block group cursor-not-allowed">
                          <span className="text-gray-400 bg-gray-100 px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 select-none">
                            🔒 Protected
                          </span>
                          {/* Hover Tooltip */}
                          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap z-10">
                            Superadmin accounts cannot be edited or deactivated
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-3">
                          <button className="text-slate-500 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
                            ✏️ Edit
                          </button>
                          <button className="text-slate-500 hover:text-red-600 font-semibold transition-colors flex items-center gap-1">
                            🗑️ Deactivate
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}