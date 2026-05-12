// src/components/modals/EditDeptModal.jsx
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { updateDept } from '../../lib/departmentService'

export default function EditDeptModal({ dept, onClose, onSuccess }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ deptname: dept?.deptname || '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.deptname) return setError('Department name is required.')
    try { setLoading(true); setError(null); await updateDept(dept.deptcode, form, user?.id); onSuccess?.(); onClose() }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div><h3 className="text-lg font-bold text-gray-900">Edit Department</h3><p className="text-xs text-gray-500">Code: {dept?.deptcode}</p></div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Department Name *</label><input value={form.deptname} onChange={e => setForm(f => ({ ...f, deptname: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50">{loading ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
