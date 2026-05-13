

import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRights, RIGHTS } from '../context/UserRightsContext'
import { getEmployees } from '../lib/employeeService'
import { getJobHistory, softDeleteJobHistory } from '../lib/jobHistoryService'
import AddJobHistoryModal from '../components/modals/AddJobHistoryModal'
import EditJobHistoryModal from '../components/modals/EditJobHistoryModal'
import SoftDeleteConfirmDialog from '../components/modals/SoftDeleteConfirmDialog'

export default function EmployeeDetailPage() {
  const { empno } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { hasRight, userRole } = useRights()
  const userType = user?.user_metadata?.role ?? 'USER'
  const canStamp = userRole === 'ADMIN' || userRole === 'SUPERADMIN'

  const [employee, setEmployee] = useState(null)
  const [history, setHistory] = useState([])
  const [loadingEmp, setLoadingEmp] = useState(true)
  const [loadingJH, setLoadingJH] = useState(true)
  const [showAddJH, setShowAddJH] = useState(false)
  const [editJH, setEditJH] = useState(null)
  const [deleteJH, setDeleteJH] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadEmployee = useCallback(async () => {
    try {
      setLoadingEmp(true)
      const all = await getEmployees('ADMIN')
      setEmployee(all.find(e => e.empno === empno) ?? null)
    } finally { setLoadingEmp(false) }
  }, [empno])

  const loadHistory = useCallback(async () => {
    try { setLoadingJH(true); setHistory(await getJobHistory(empno, userType)) }
    finally { setLoadingJH(false) }
  }, [empno, userType])

  useEffect(() => { loadEmployee(); loadHistory() }, [loadEmployee, loadHistory])

  const handleDeleteJH = async () => {
    try { setDeleting(true); await softDeleteJobHistory(deleteJH.id, user?.id); setDeleteJH(null); loadHistory() }
    catch (e) { alert(e.message) } finally { setDeleting(false) }
  }

  if (loadingEmp) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
  if (!employee) return <div className="text-center py-20 text-gray-500">Employee not found. <button onClick={() => navigate('/employees')} className="text-blue-600 underline">Go back</button></div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/employees')} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">← Back to Employees</button>
      </div>

      {}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 flex-shrink-0">
            {employee.firstname?.[0]}{employee.lastname?.[0]}
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><p className="text-xs text-gray-400 font-medium">Employee No</p><p className="text-sm font-bold text-gray-900">{employee.empno}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Full Name</p><p className="text-sm font-semibold text-gray-800">{employee.lastname}, {employee.firstname}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Gender</p><p className="text-sm text-gray-700">{employee.gender === 'M' ? 'Male' : 'Female'}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Birthdate</p><p className="text-sm text-gray-700">{employee.birthdate || '—'}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Hire Date</p><p className="text-sm text-gray-700">{employee.hiredate}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Sep Date</p><p className="text-sm text-gray-700">{employee.sepdate || '—'}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Current Job</p><p className="text-sm text-gray-700">{employee.current_jobdesc || '—'}</p></div>
            <div><p className="text-xs text-gray-400 font-medium">Status</p>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${employee.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{employee.record_status}</span>
            </div>
            {canStamp && <div className="col-span-2"><p className="text-xs text-gray-400 font-medium">Audit Stamp</p><p className="text-xs text-gray-500 font-mono">{employee.stamp || '—'}</p></div>}
          </div>
        </div>
      </div>

      {}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Job History</h3>
            <p className="text-xs text-gray-500 mt-0.5">Sorted by effective date (newest first)</p>
          </div>
          {hasRight(RIGHTS.JH_ADD) && (
            <button onClick={() => setShowAddJH(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all">
              <span>＋</span> Add Record
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Eff. Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Salary</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                {canStamp && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loadingJH ? (
                <tr><td colSpan={canStamp ? 7 : 6} className="py-8 text-center"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : history.length === 0 ? (
                <tr><td colSpan={canStamp ? 7 : 6} className="py-10 text-center text-sm text-gray-400">No job history records found.</td></tr>
              ) : history.map(jh => (
                <tr key={jh.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><p className="text-xs font-bold text-gray-700">{jh.jobcode}</p><p className="text-xs text-gray-500">{jh.jobdesc}</p></td>
                  <td className="px-4 py-3"><p className="text-xs font-bold text-gray-700">{jh.deptcode}</p><p className="text-xs text-gray-500">{jh.deptname}</p></td>
                  <td className="px-4 py-3 text-sm text-gray-700">{jh.effdate}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">₱{Number(jh.salary).toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${jh.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{jh.record_status}</span></td>
                  {canStamp && <td className="px-4 py-3 text-xs text-gray-400 font-mono">{jh.stamp || '—'}</td>}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {hasRight(RIGHTS.JH_EDIT) && <button onClick={() => setEditJH(jh)} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-blue-100 hover:text-blue-700 transition-colors">✏️</button>}
                      {hasRight(RIGHTS.JH_DEL) && jh.record_status === 'ACTIVE' && <button onClick={() => setDeleteJH(jh)} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-red-100 hover:text-red-700 transition-colors">🗑️</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddJH && <AddJobHistoryModal empno={empno} onClose={() => setShowAddJH(false)} onSuccess={loadHistory} />}
      {editJH && <EditJobHistoryModal record={editJH} onClose={() => setEditJH(null)} onSuccess={loadHistory} />}
      {deleteJH && <SoftDeleteConfirmDialog title="Soft-Delete Job History" message={`Mark this job history record (${deleteJH.jobdesc}) as INACTIVE?`} loading={deleting} onConfirm={handleDeleteJH} onCancel={() => setDeleteJH(null)} />}
    </div>
  )
}
