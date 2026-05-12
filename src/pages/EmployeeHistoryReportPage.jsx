// src/pages/EmployeeHistoryReportPage.jsx
// M2 Sprint 3 PR-02: feat/ui-reports
import { useEffect, useState } from 'react'
import { getEmployeeFullHistory } from '../lib/reportsService'
import { getEmployees } from '../lib/employeeService'

export default function EmployeeHistoryReportPage() {
  const [employees, setEmployees] = useState([])
  const [selectedEmpno, setSelectedEmpno] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [empLoading, setEmpLoading] = useState(true)

  useEffect(() => {
    getEmployees('ADMIN')
      .then(setEmployees)
      .finally(() => setEmpLoading(false))
  }, [])

  const handleSearch = async () => {
    if (!selectedEmpno) return
    try {
      setLoading(true); setResult(null)
      setResult(await getEmployeeFullHistory(selectedEmpno))
    } catch (e) { alert(e.message) } finally { setLoading(false) }
  }

  const fmt = (n) => `₱${Number(n).toLocaleString()}`

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Employee Full History</h2>
        <p className="text-sm text-gray-500 mt-1">Select an employee to view their complete job history chronologically.</p>
      </div>

      {/* Employee Selector */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Employee</label>
          <select value={selectedEmpno} onChange={e => setSelectedEmpno(e.target.value)} disabled={empLoading} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">— Choose an employee —</option>
            {employees.map(e => <option key={e.empno} value={e.empno}>{e.empno} — {e.lastname}, {e.firstname}</option>)}
          </select>
        </div>
        <button onClick={handleSearch} disabled={!selectedEmpno || loading} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 transition-all">
          {loading ? 'Loading…' : 'View History'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Profile Summary */}
          {result.employee && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold text-blue-700">
                {result.employee.firstname?.[0]}{result.employee.lastname?.[0]}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 flex-1">
                <div><p className="text-xs text-blue-500 font-medium">Employee No</p><p className="text-sm font-bold text-blue-900">{result.employee.empno}</p></div>
                <div><p className="text-xs text-blue-500 font-medium">Name</p><p className="text-sm font-semibold text-blue-800">{result.employee.lastname}, {result.employee.firstname}</p></div>
                <div><p className="text-xs text-blue-500 font-medium">Hire Date</p><p className="text-sm text-blue-800">{result.employee.hiredate}</p></div>
                <div><p className="text-xs text-blue-500 font-medium">Status</p><p className={`text-sm font-semibold ${result.employee.record_status === 'ACTIVE' ? 'text-emerald-700' : 'text-red-600'}`}>{result.employee.record_status}</p></div>
              </div>
            </div>
          )}

          {/* History Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Job History — Chronological</h3>
              <p className="text-xs text-gray-400 mt-0.5">{result.history.length} record{result.history.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Eff. Date</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Salary</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.history.length === 0 ? (
                    <tr><td colSpan={6} className="py-10 text-center text-sm text-gray-400">No history records found.</td></tr>
                  ) : result.history.map((jh, i) => (
                    <tr key={jh.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-sm text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-5 py-3"><p className="text-xs font-bold text-gray-700">{jh.jobcode}</p><p className="text-xs text-gray-500">{jh.jobdesc}</p></td>
                      <td className="px-5 py-3"><p className="text-xs font-bold text-gray-700">{jh.deptcode}</p><p className="text-xs text-gray-500">{jh.deptname}</p></td>
                      <td className="px-5 py-3 text-sm text-gray-700">{jh.effdate}</td>
                      <td className="px-5 py-3 text-right text-sm font-semibold text-gray-800">{fmt(jh.salary)}</td>
                      <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${jh.record_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{jh.record_status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
