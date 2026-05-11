import React from 'react'

export default function Reports() {
  // Mock data representing the SQL views to calculate headcounts and salaries
  const departmentStats = [
    { name: 'Information Technology', headcount: 14, percent: 45, avgSalary: '₱68,500' },
    { name: 'Human Resources', headcount: 5, percent: 16, avgSalary: '₱42,000' },
    { name: 'Finance', headcount: 7, percent: 23, avgSalary: '₱55,000' },
    { name: 'Operations', headcount: 5, percent: 16, avgSalary: '₱38,000' },
  ]

  const chronologicalHistory = [
    { date: 'May 08, 2026', title: 'System Access Audit Completed', details: 'All Superadmin security policies set to protected state.' },
    { date: 'Apr 24, 2026', title: 'Department Structure Updated', details: 'Added new technical support positions to Information Technology.' },
    { date: 'Mar 15, 2026', title: 'Row-Level Security Active', details: 'Database constraints enforced on employee transaction logs.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time analytical summaries compiled from active databases.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Staffing Headcount (Mock Visual Chart) */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Department Headcount Breakdown</h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>{dept.name}</span>
                  <span>{dept.headcount} Employees ({dept.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${dept.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Summaries Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Department Salary Summaries</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 text-left">Department</th>
                  <th className="pb-3 text-right">Avg Monthly Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {departmentStats.map((dept) => (
                  <tr key={dept.name}>
                    <td className="py-3 font-medium text-gray-900">{dept.name}</td>
                    <td className="py-3 text-right text-slate-600 font-semibold">{dept.avgSalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chronological System History View (Timeline) */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm xl:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">Chronological Employee History</h3>
          <div className="relative border-l-2 border-slate-200 pl-6 space-y-6 ml-2">
            {chronologicalHistory.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Pin */}
                <span className="absolute -left-[31px] top-1 bg-blue-500 w-4 h-4 rounded-full border-4 border-white ring-2 ring-blue-500/20"></span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.date}</span>
                <h4 className="text-sm font-bold text-gray-900 mt-0.5">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}