import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './src/context/AuthContext'

export default function RouteGuard({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user?.user_metadata?.role === 'USER' && location.pathname.includes('deleted-items')) {
    return <Navigate to="/" replace />
  }

  return children
}
