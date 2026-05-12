// src/pages/SalaryReportPage.jsx
// M2 Sprint 3 PR-02: feat/ui-reports
import { useEffect, useState } from 'react'
import { getSalarySummaryByJob } from '../lib/reportsService'

export default function SalaryReportPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSalarySummaryByJob()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const fmt = (n) => `₱${Number(n).toLocaleString()}`

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Salary Summary by Job</h2>
        <p className="text-sm text-gray-500 mt-1">Min, Max, and Average salary per active job position.</p>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">{error}</div>}

      {!loading && !error && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Highest Avg Salary', value: fmt(Math.max(...data.map(d => d.avg_salary))), color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { label: 'Lowest Avg Salary',  value: fmt(Math.min(...data.map(d => d.avg_salary))), color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { label: 'Job Positions',      value: data.length,                                    color: 'bg-blue-50 text-blue-700 border-blue-200' },
            ].map(c => (
              <div key={c.label} className={`rounded-xl border p-5 ${c.color}`}>
                <p className="text-xs font-semibold opacity-70">{c.label}</p>
                <p className="text-2xl font-bold mt-1">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Code</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Description</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Min Salary</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Max Salary</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Avg Salary</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.map(d => (
                    <tr key={d.jobcode} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-sm font-bold text-gray-700">{d.jobcode}</td>
                      <td className="px-5 py-3 text-sm text-gray-700">{d.jobdesc}</td>
                      <td className="px-5 py-3 text-right text-sm text-gray-600">{fmt(d.min_salary)}</td>
                      <td className="px-5 py-3 text-right text-sm text-gray-600">{fmt(d.max_salary)}</td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-sm font-bold text-emerald-700">{fmt(d.avg_salary)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
