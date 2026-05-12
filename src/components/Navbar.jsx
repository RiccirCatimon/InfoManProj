import { useAuth } from '../context/AuthContext'
import { useRights } from '../context/UserRightsContext'

export default function Navbar() {
  const { user } = useAuth()
  const { userRole } = useRights()

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-8">
        {/* Mobile Toggle Placeholder */}
        <div className="lg:hidden text-gray-500 text-2xl">☰</div>
        
        {/* Search Bar Placeholder */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-96 group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <span className="text-gray-400 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Search employees, records, or reports..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
          />
          <span className="text-[10px] font-bold text-gray-300 border border-gray-200 rounded px-1.5 py-0.5 ml-2 shadow-sm">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications Placeholder */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <span>🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-5 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {user?.user_metadata?.first_name || user?.email?.split('@')[0]}
            </p>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">
              {userRole || 'USER'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-md flex items-center justify-center text-white font-black text-sm">
            {user?.email?.[0].toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  )
}