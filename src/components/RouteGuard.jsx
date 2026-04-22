import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RouteGuard({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // Block regular users from accessing /deleted-items
  if (user?.role === 'USER' && location.pathname.includes('deleted-items')) {
    return <Navigate to="/" replace />
  }

  return children
}