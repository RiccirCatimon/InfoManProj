

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRights, RIGHTS } from '../context/UserRightsContext'
import { getEmployees, softDeleteEmployee } from '../lib/employeeService'
import AddEmployeeModal from '../components/modals/AddEmployeeModal'
import EditEmployeeModal from '../components/modals/EditEmployeeModal'
import SoftDeleteConfirmDialog from '../components/modals/SoftDeleteConfirmDialog'

export default function EmployeeListPage() {
  const { user } = useAuth()
  const { hasRight, userRole } = useRights()
  const navigate = useNavigate()
  const userType = user?.user_metadata?.role ?? 'USER'
  const canStamp = userRole === 'ADMIN' || userRole === 'SUPERADMIN'

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    try { setLoading(true); setError(null); setEmployees(await getEmployees(userType)) }
    catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [userType])

  useEffect(() => { load() }, [load])

  const handleDelete = async () => {
    try { setDeleting(true); await softDeleteEmployee(deleteTarget.empno, user?.id); setDeleteTarget(null); load() }
    catch (e) { alert(e.message) } finally { setDeleting(false) }
  }

  const filtered = employees.filter(e =>
    `${e.lastname} ${e.firstname} ${e.empno}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Registry</h2>
          <p className="text-sm text-gray-500 mt-1">
            {userType === 'USER' ? 'Showing active employees only.' : 'Showing all employees (ADMIN view).'}
          </p>
        </div>
        {hasRight(RIGHTS.EMP_ADD) && (
          <button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-all">
            <span>＋</span> Add Employee
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or emp no…" className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <span className="text-xs text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"><p className="text-red-700 font-semibold">Error</p><p className="text-sm text-red-600">{error}</p><button onClick={load} className="mt-3 px-4 py-2 bg-red-600 text-white text-xs rounded-lg">Retry</button></div>}

      {!loading && !error && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Emp No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Last Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">First Name</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Gender</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hire Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sep Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Job</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  {canStamp && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={canStamp ? 10 : 9} className="px-4 py-12 text-center text-sm text-gray-400">No employees found.</td></tr>
                ) : filtered.map(emp => (
                  <tr key={emp.empno} onClick={() => navigate(`/employees/${emp.empno}`)} className="hover:bg-blue-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{emp.empno}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{emp.lastname}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{emp.firstname}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${emp.gender === 'M' ? 'bg-indigo-50 text-indigo-700' : 'bg-pink-50 text-pink-700'}`}>{emp.gender}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{emp.hiredate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{emp.sepdate || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.current_jobdesc || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${emp.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{emp.record_status}</span>
                    </td>
                    {canStamp && (
                      <td className="px-4 py-3 text-xs text-gray-400 max-w-[160px]">
                        <div>By: {emp.created_by}</div>
                        <div>{emp.created_at?.slice(0, 10)}</div>
                      </td>
                    )}
                    <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        {hasRight(RIGHTS.EMP_EDIT) && (
                          <button onClick={() => setEditTarget(emp)} className="text-xs px-2.5 py-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors">✏️ Edit</button>
                        )}
                        {hasRight(RIGHTS.EMP_DEL) && emp.record_status === 'ACTIVE' && (
                          <button onClick={() => setDeleteTarget(emp)} className="text-xs px-2.5 py-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-700 font-medium transition-colors">🗑️ Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex justify-between text-xs text-gray-500">
            <span>Total: {filtered.length} employee{filtered.length !== 1 ? 's' : ''}</span>
            {!canStamp && <span className="text-amber-600 font-medium">⚠ Stamp column hidden (USER role)</span>}
          </div>
        </div>
      )}

      {showAdd && <AddEmployeeModal onClose={() => setShowAdd(false)} onSuccess={load} />}
      {editTarget && <EditEmployeeModal employee={editTarget} onClose={() => setEditTarget(null)} onSuccess={load} />}
      {deleteTarget && (
        <SoftDeleteConfirmDialog
          title="Soft-Delete Employee"
          message={`Mark ${deleteTarget.firstname} ${deleteTarget.lastname} (${deleteTarget.empno}) as INACTIVE? All their job history rows will also be deactivated.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
