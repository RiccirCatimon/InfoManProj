

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRights, RIGHTS } from '../context/UserRightsContext'
import { getJobs, softDeleteJob } from '../lib/jobService'
import AddJobModal from '../components/modals/AddJobModal'
import EditJobModal from '../components/modals/EditJobModal'
import SoftDeleteConfirmDialog from '../components/modals/SoftDeleteConfirmDialog'

export default function JobListPage() {
  const { user } = useAuth()
  const { hasRight, userRole } = useRights()
  const userType = user?.user_metadata?.role ?? 'USER'
  const canSeeStatus = userRole === 'ADMIN' || userRole === 'SUPERADMIN'

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    try { setLoading(true); setError(null); setJobs(await getJobs(userType)) }
    catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [userType])

  useEffect(() => { load() }, [load])

  const handleDelete = async () => {
    try { setDeleting(true); await softDeleteJob(deleteTarget.jobcode, user?.id); setDeleteTarget(null); load() }
    catch (e) { alert(e.message) } finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Positions</h2>
          <p className="text-sm text-gray-500 mt-1">Manage job codes and descriptions.</p>
        </div>
        {hasRight(RIGHTS.JOB_ADD) && (
          <button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
            <span>＋</span> Add Job
          </button>
        )}
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">{error}</div>}

      {!loading && !error && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Code</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  {canSeeStatus && <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>}
                  {canSeeStatus && <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>}
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {jobs.length === 0 ? (
                  <tr><td colSpan={canSeeStatus ? 4 : 3} className="px-5 py-10 text-center text-sm text-gray-400">No jobs found.</td></tr>
                ) : jobs.map(job => (
                  <tr key={job.jobcode} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-bold text-gray-900">{job.jobcode}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{job.jobdesc}</td>
                    {canSeeStatus && (
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${job.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{job.record_status}</span>
                      </td>
                    )}
                    {canSeeStatus && <td className="px-5 py-3 text-xs text-gray-400">{job.stamp || '—'}</td>}
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {hasRight(RIGHTS.JOB_EDIT) && <button onClick={() => setEditTarget(job)} className="text-xs px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors">✏️ Edit</button>}
                        {hasRight(RIGHTS.JOB_DEL) && job.record_status === 'ACTIVE' && <button onClick={() => setDeleteTarget(job)} className="text-xs px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-red-100 hover:text-red-700 font-medium transition-colors">🗑️ Delete</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border-t px-5 py-2 text-xs text-gray-500">{jobs.length} job{jobs.length !== 1 ? 's' : ''}</div>
        </div>
      )}

      {showAdd && <AddJobModal onClose={() => setShowAdd(false)} onSuccess={load} />}
      {editTarget && <EditJobModal job={editTarget} onClose={() => setEditTarget(null)} onSuccess={load} />}
      {deleteTarget && <SoftDeleteConfirmDialog title="Soft-Delete Job" message={`Mark "${deleteTarget.jobdesc}" as INACTIVE?`} loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
    </div>
  )
}
