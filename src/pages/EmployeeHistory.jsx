import { mockHistory } from '../mock/data'
import EmptyState from '../components/EmptyState'

export default function EmployeeHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Employee History</h2>
        <p className="text-sm text-gray-500 mt-1">Audit log of system actions, role updates, and employee profile modifications.</p>
      </div>

      {!mockHistory || mockHistory.length === 0 ? (
        <EmptyState
          icon="📜"
          title="No History Recorded"
          description="System activities, status edits, and role changes will automatically log and appear here over time."
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">System Activity Log</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockHistory.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                    📝
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500">Employee: <span className="font-medium text-gray-700">{log.employeeName}</span> (ID: {log.employeeId})</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {log.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}