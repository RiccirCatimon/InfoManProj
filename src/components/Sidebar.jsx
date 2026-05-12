// src/components/Sidebar.jsx
// M2 PR-05: fix/ui-sidebar-gating — Hide Deleted Items + Admin links for USER
// M4 PR-04: feat/rights-stamp-sidebar
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRights, RIGHTS } from '../context/UserRightsContext'

export default function Sidebar() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { hasRight, userRole } = useRights()

  const isAdmin = userRole === 'ADMIN' || userRole === 'SUPERADMIN'

  const navItems = [
    { name: 'Dashboard',    path: '/',            icon: '🏠', show: true },
    { name: 'Employees',    path: '/employees',   icon: '👤', show: true },
    { name: 'Jobs',         path: '/jobs',        icon: '💼', show: true },
    { name: 'Departments',  path: '/departments', icon: '🏢', show: true },
    // Reports sub-section
    { name: 'Headcount',    path: '/reports/headcount',        icon: '📊', show: true, sub: true },
    { name: 'Salary Report',path: '/reports/salary',           icon: '💰', show: true, sub: true },
    { name: 'Emp History',  path: '/reports/employee-history', icon: '📋', show: true, sub: true },
    // Admin only
    { name: 'Deleted Items',   path: '/deleted-items',    icon: '🗑️', show: isAdmin },
    { name: 'User Management', path: '/user-management',  icon: '👥', show: isAdmin && hasRight(RIGHTS.ADM_USER) },
  ]

  const handleLogout = async () => {
    try { await signOut() } catch (e) { console.error(e) }
  }

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 flex-shrink-0">
      {/* Brand */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-lg">H</div>
        <div>
          <span className="font-bold text-base tracking-wide text-slate-100">Hope HRS</span>
          <p className="text-[10px] text-slate-400 font-medium">{userRole ?? 'USER'}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
        {/* Reports label */}
        <div className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main</div>
        {navItems.slice(0, 4).filter(i => i.show).map(item => (
          <NavLink key={item.path} item={item} active={isActive(item.path)} />
        ))}

        <div className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reports</div>
        {navItems.slice(4, 7).filter(i => i.show).map(item => (
          <NavLink key={item.path} item={item} active={isActive(item.path)} sub />
        ))}

        {isAdmin && (
          <>
            <div className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin</div>
            {navItems.slice(7).filter(i => i.show).map(item => (
              <NavLink key={item.path} item={item} active={isActive(item.path)} />
            ))}
          </>
        )}
      </nav>

      {/* User info + Logout */}
      <div className="p-3 border-t border-slate-800">
        {user && (
          <div className="px-3 py-2 mb-1 text-xs text-slate-400 truncate">
            <span className="font-medium text-slate-300">{user.user_metadata?.first_name || user.email}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
        >
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

function NavLink({ item, active, sub }) {
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${sub ? 'pl-5' : ''} ${
        active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <span className="text-base">{item.icon}</span>
      <span>{item.name}</span>
    </Link>
  )
}