import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reports() {
  const navigate = useNavigate()

  const reportCards = [
    {
      id: 'headcount',
      title: 'Headcount by Department',
      description: 'Distribution of active employees across various organizational units.',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600',
      path: '/reports/headcount'
    },
    {
      id: 'salary',
      title: 'Salary Summary by Job',
      description: 'Detailed analysis of minimum, maximum, and average salaries per job role.',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      path: '/reports/salary'
    },
    {
      id: 'history',
      title: 'Employee Full History',
      description: 'Comprehensive chronological record of all job transitions for specific employees.',
      icon: '📋',
      color: 'from-purple-500 to-indigo-600',
      path: '/reports/employee-history'
    }
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Reports</h2>
        <p className="text-gray-500 mt-2 text-lg">Select a report to view live analytical data from the HR database.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reportCards.map((report) => (
          <div 
            key={report.id}
            onClick={() => navigate(report.path)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className={`h-32 bg-gradient-to-br ${report.color} p-6 flex items-end justify-between`}>
              <span className="text-5xl drop-shadow-lg">{report.icon}</span>
              <div className="bg-white/20 backdrop-blur-md rounded-full p-2 group-hover:rotate-45 transition-transform">
                <span className="text-white">↗️</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{report.title}</h3>
              <p className="mt-3 text-gray-500 leading-relaxed text-sm">
                {report.description}
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
                Open Report <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mt-12">
        <div className="flex items-start gap-4">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">About Live Reports</h4>
            <p className="text-sm text-slate-600 mt-1">
              These reports are generated from SQL views in real-time. They only include employees with an <strong>ACTIVE</strong> record status. 
              Admin and Superadmin users have full access to these metrics, while general users may have limited visibility based on their assigned rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}