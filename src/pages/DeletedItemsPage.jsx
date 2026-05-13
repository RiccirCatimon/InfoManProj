

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRights, RIGHTS } from '../context/UserRightsContext'
import { getEmployees, recoverEmployee } from '../lib/employeeService'
import { getJobHistory, recoverJobHistory } from '../lib/jobHistoryService'
import { getJobs, recoverJob } from '../lib/jobService'
import { getDepts, recoverDept } from '../lib/departmentService'

const TABS = ['Employees', 'Job History', 'Jobs', 'Departments']

function RecoverBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} className="text-xs px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-semibold transition-colors disabled:opacity-50">
      {loading ? 'Recovering…' : '↩ Recover'}
    </button>
  )
}

export default function DeletedItemsPage() {
  const { user } = useAuth()
  const { hasRight } = useRights()
  const [tab, setTab] = useState(0)
  const [data, setData] = useState({ employees: [], jobHistory: [], jobs: [], depts: [] })
  const [loading, setLoading] = useState(true)
  const [recovering, setRecovering] = useState(null)

  const loadAll = useCallback(async () => {
    try {
      setLoading(true)
      const [employees, jobHistory, jobs, depts] = await Promise.all([
        getEmployees('ADMIN'),
        getJobHistory(null, 'ADMIN'),
        getJobs('ADMIN'),
        getDepts('ADMIN'),
      ])
      setData({
        employees: employees.filter(e => e.record_status === 'INACTIVE'),
        jobHistory: jobHistory.filter(jh => jh.record_status === 'INACTIVE'),
        jobs: jobs.filter(j => j.record_status === 'INACTIVE'),
        depts: depts.filter(d => d.record_status === 'INACTIVE'),
      })
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const recover = async (fn, id) => {
    try { setRecovering(id); await fn(id, user?.id); loadAll() }
    catch (e) { alert(e.message) } finally { setRecovering(null) }
  }

  const tabCounts = [data.employees.length, data.jobHistory.length, data.jobs.length, data.depts.length]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Deleted Items</h2>
        <p className="text-sm text-gray-500 mt-1">All INACTIVE records across all HR tables. Recover to restore.</p>
      </div>

      {}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === i ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${tab === i ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-500'}`}>{tabCounts[i]}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {}
          {tab === 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Emp No</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hire Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sep Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {data.employees.length === 0 ? <tr><td colSpan={5} className="py-10 text-center text-sm text-gray-400">No deleted employees.</td></tr>
                : data.employees.map(e => (
                  <tr key={e.empno} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-bold text-gray-700">{e.empno}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{e.lastname}, {e.firstname}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{e.hiredate}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{e.sepdate || '—'}</td>
                    <td className="px-5 py-3 text-xs text-gray-400 font-mono">{e.stamp || '—'}</td>
                    <td className="px-5 py-3 text-right">{hasRight(RIGHTS.EMP_RECOVER) && <RecoverBtn onClick={() => recover(recoverEmployee, e.empno)} loading={recovering === e.empno} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {}
          {tab === 1 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Emp No</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Eff. Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {data.jobHistory.length === 0 ? <tr><td colSpan={5} className="py-10 text-center text-sm text-gray-400">No deleted job history records.</td></tr>
                : data.jobHistory.map(jh => (
                  <tr key={jh.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-bold text-gray-700">{jh.empno}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{jh.jobdesc}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{jh.deptname}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{jh.effdate}</td>
                    <td className="px-5 py-3 text-xs text-gray-400 font-mono">{jh.stamp || '—'}</td>
                    <td className="px-5 py-3 text-right">{hasRight(RIGHTS.JH_RECOVER) && <RecoverBtn onClick={() => recover(recoverJobHistory, jh.id)} loading={recovering === jh.id} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {}
          {tab === 2 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Code</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {data.jobs.length === 0 ? <tr><td colSpan={3} className="py-10 text-center text-sm text-gray-400">No deleted jobs.</td></tr>
                : data.jobs.map(j => (
                  <tr key={j.jobcode} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-bold text-gray-700">{j.jobcode}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{j.jobdesc}</td>
                    <td className="px-5 py-3 text-xs text-gray-400 font-mono">{j.stamp || '—'}</td>
                    <td className="px-5 py-3 text-right"><RecoverBtn onClick={() => recover(recoverJob, j.jobcode)} loading={recovering === j.jobcode} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {}
          {tab === 3 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Dept Code</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stamp</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {data.depts.length === 0 ? <tr><td colSpan={3} className="py-10 text-center text-sm text-gray-400">No deleted departments.</td></tr>
                : data.depts.map(d => (
                  <tr key={d.deptcode} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-bold text-gray-700">{d.deptcode}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{d.deptname}</td>
                    <td className="px-5 py-3 text-xs text-gray-400 font-mono">{d.stamp || '—'}</td>
                    <td className="px-5 py-3 text-right"><RecoverBtn onClick={() => recover(recoverDept, d.deptcode)} loading={recovering === d.deptcode} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
