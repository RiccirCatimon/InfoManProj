// src/pages/UserManagementPage.jsx
// M2 Sprint 3 PR-01: feat/ui-admin-users — SUPERADMIN row protection
import { useEffect, useState, useCallback } from 'react'
import { getUsers, activateUser, deactivateUser } from '../lib/adminService'

export default function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actioning, setActioning] = useState(null)

  const load = useCallback(async () => {
    try { setLoading(true); setError(null); setUsers(await getUsers()) }
    catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleAction = async (fn, id) => {
    try { setActioning(id); await fn(id); load() }
    catch (e) { alert(e.message) } finally { setActioning(null) }
  }

  const roleColors = {
    SUPERADMIN: 'bg-purple-100 text-purple-700',
    ADMIN: 'bg-blue-100 text-blue-700',
    USER: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system user accounts and activation status. SUPERADMIN accounts are protected.</p>
        </div>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">{error}</div>}

      {!loading && !error && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Username</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users.map(u => {
                  const isSA = u.user_type === 'SUPERADMIN'
                  const isActioning = actioning === u.id
                  return (
                    <tr key={u.id} className={`hover:bg-gray-50 transition-colors ${isSA ? 'bg-purple-50/30' : ''}`}>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                        {isSA && <span className="text-purple-500">👑</span>}
                        {u.username}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{u.email}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${roleColors[u.user_type] || 'bg-gray-100 text-gray-700'}`}>{u.user_type}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.record_status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {u.record_status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {isSA ? (
                          <div className="relative inline-block group">
                            <span className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed select-none">🔒 Protected</span>
                            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1.5 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-20">
                              SUPERADMIN accounts cannot be modified
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            {u.record_status === 'INACTIVE' && (
                              <button onClick={() => handleAction(activateUser, u.id)} disabled={isActioning} className="text-xs px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-semibold transition-colors disabled:opacity-50">
                                {isActioning ? '…' : '✅ Activate'}
                              </button>
                            )}
                            {u.record_status === 'ACTIVE' && (
                              <button onClick={() => handleAction(deactivateUser, u.id)} disabled={isActioning} className="text-xs px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 font-semibold transition-colors disabled:opacity-50">
                                {isActioning ? '…' : '🚫 Deactivate'}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border-t px-5 py-2 text-xs text-gray-500">{users.length} user account{users.length !== 1 ? 's' : ''}</div>
        </div>
      )}
    </div>
  )
}
