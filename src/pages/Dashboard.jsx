import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDashboardStats } from '../lib/reportsService'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.user_metadata?.first_name || 'Admin'}!</h2>
        <p className="mt-2 text-blue-100 text-lg">Here's what's happening in Hope, Inc. today.</p>
      </div>

      {}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm border border-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Employees" value={stats.totalEmployees} icon="👥" color="bg-blue-500" />
          <StatCard title="Departments" value={stats.totalDepts} icon="🏢" color="bg-emerald-500" />
          <StatCard title="Job Roles" value={stats.totalJobs} icon="💼" color="bg-amber-500" />
          <StatCard title="Avg. Salary" value={`₱${stats.avgSalary.toLocaleString()}`} icon="💰" color="bg-indigo-500" />
        </div>
      )}

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <QuickAction icon="👤" label="Add Employee" link="/employees" color="bg-blue-50 text-blue-600" />
            <QuickAction icon="📊" label="Headcount" link="/reports/headcount" color="bg-emerald-50 text-emerald-600" />
            <QuickAction icon="📝" label="Job History" link="/reports/employee-history" color="bg-purple-50 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <StatusItem label="Database" status="Operational" dot="bg-emerald-500" />
            <StatusItem label="Auth Service" status="Operational" dot="bg-emerald-500" />
            <StatusItem label="Reports Engine" status="Online" dot="bg-emerald-500" />
          </div>
          <div className="mt-8 pt-6 border-t border-gray-50 text-xs text-gray-400">
            Sprint 3 Release Candidate v1.0
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center text-xl shadow-inner`}>
        {icon}
      </div>
    </div>
  )
}

function QuickAction({ icon, label, link, color }) {
  return (
    <a href={link} className={`flex flex-col items-center justify-center p-4 rounded-2xl ${color} transition-all hover:scale-105 active:scale-95 font-semibold text-sm`}>
      <span className="text-2xl mb-2">{icon}</span>
      {label}
    </a>
  )
}

function StatusItem({ label, status, dot }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-900">{status}</span>
        <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
      </div>
    </div>
  )
}