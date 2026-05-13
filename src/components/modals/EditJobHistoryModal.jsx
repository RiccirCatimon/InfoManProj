
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { updateJobHistory } from '../../lib/jobHistoryService'
import { getJobs } from '../../lib/jobService'
import { getDepts } from '../../lib/departmentService'

export default function EditJobHistoryModal({ record, onClose, onSuccess }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ jobcode: record?.jobcode || '', deptcode: record?.deptcode || '', effdate: record?.effdate || '', salary: record?.salary || '' })
  const [jobs, setJobs] = useState([])
  const [depts, setDepts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getJobs('ADMIN'), getDepts('ADMIN')]).then(([j, d]) => { setJobs(j); setDepts(d) })
  }, [])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true); setError(null)
      const selectedJob = jobs.find(j => j.jobcode === form.jobcode)
      const selectedDept = depts.find(d => d.deptcode === form.deptcode)
      await updateJobHistory(record.id, { ...form, jobdesc: selectedJob?.jobdesc, deptname: selectedDept?.deptname, salary: Number(form.salary) }, user?.id)
      onSuccess?.(); onClose()
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Edit Job History</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Job</label>
              <select value={form.jobcode} onChange={set('jobcode')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {jobs.map(j => <option key={j.jobcode} value={j.jobcode}>{j.jobdesc}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
              <select value={form.deptcode} onChange={set('deptcode')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {depts.map(d => <option key={d.deptcode} value={d.deptcode}>{d.deptname}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Effective Date</label>
              <input type="date" value={form.effdate} onChange={set('effdate')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Salary</label>
              <input type="number" value={form.salary} onChange={set('salary')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50">
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
