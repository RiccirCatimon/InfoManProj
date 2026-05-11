import { useAuth } from '../context/AuthContext'

export default function Topbar() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 select-none">
      {/* Context Title */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">Information Management 2</span>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-800">HR System</span>
      </div>

      {/* User Info Bar */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Logged in as</p>
          <p className="text-sm font-semibold text-gray-700">{user?.email || 'Guest User'}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm border border-blue-100">
          {user?.email ? user.email.charAt(0).toUpperCase() : 'G'}
        </div>
      </div>
    </header>
  )
}