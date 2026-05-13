

import { useEffect, useState } from 'react'
import { getHeadcountByDept } from '../lib/reportsService'

export default function HeadcountByDeptPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getHeadcountByDept()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const max = Math.max(...data.map(d => d.headcount), 1)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Headcount by Department</h2>
        <p className="text-sm text-gray-500 mt-1">Active employee count per department based on current job assignments.</p>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-5">Employee Distribution</h3>
            <div className="space-y-4">
              {data.map(d => (
                <div key={d.deptcode}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-700">{d.deptname}</span>
                    <span className="font-bold text-blue-600">{d.headcount}</span>
                  </div>
                  <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg transition-all duration-700"
                      style={{ width: `${(d.headcount / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-5 text-right">Total: {data.reduce((s, d) => s + d.headcount, 0)} active employees</p>
          </div>

          {}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-700">Summary Table</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Dept Code</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Headcount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map(d => (
                  <tr key={d.deptcode} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-bold text-gray-700">{d.deptcode}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{d.deptname}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">{d.headcount}</span>
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
