import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase'

const AuthContext = createContext({})

// ── Demo/offline mock accounts ─────────────────────────────────────────────
// These are used when .env has no real Supabase credentials.
// Replace with your real Supabase URL + key to switch to live auth.
const DEMO_ACCOUNTS = [
  {
    id: 'demo-superadmin',
    email: 'admin@hopehrs.com',
    password: 'admin123',
    user_metadata: { first_name: 'Riccir', last_name: 'Catimon', username: 'riccir', role: 'SUPERADMIN' }
  },
  {
    id: 'demo-user',
    email: 'user@hopehrs.com',
    password: 'user123',
    user_metadata: { first_name: 'Jane', last_name: 'Doe', username: 'janedoe', role: 'USER' }
  }
]

const SESSION_KEY = 'hope_hrs_demo_session'

function loadDemoSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}
function saveDemoSession(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(SESSION_KEY)
}
// ───────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      // Demo mode: restore previous session from localStorage
      const saved = loadDemoSession()
      if (saved) {
        setUser(saved)
        setSession({ user: saved })
      }
      setLoading(false)
      return
    }

    // Real Supabase mode
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // Section 4.2 Login Guard
        const { data: userRow, error } = await supabase
          .from('users')
          .select('record_status, user_type')
          .eq('id', session.user.id)
          .single()
        
        if (userRow?.record_status !== 'ACTIVE') {
          await supabase.auth.signOut()
          alert('Your account is pending activation by an HR administrator.')
          setUser(null)
          setSession(null)
          return
        }
      }
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (!SUPABASE_CONFIGURED) {
      const found = DEMO_ACCOUNTS.find(
        a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
      )
      if (!found) {
        return { data: null, error: { message: 'Invalid email or password. (Demo mode — try admin@hopehrs.com / admin123)' } }
      }
      const mockUser = { id: found.id, email: found.email, user_metadata: found.user_metadata }
      saveDemoSession(mockUser)
      setUser(mockUser)
      setSession({ user: mockUser })
      return { data: { user: mockUser }, error: null }
    }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email, password, userData) => {
    if (!SUPABASE_CONFIGURED) {
      // Demo mode: pretend it worked — they need real Supabase to persist accounts
      return { data: { user: { email } }, error: null }
    }
    return supabase.auth.signUp({ email, password, options: { data: userData } })
  }

  const signOut = async () => {
    if (!SUPABASE_CONFIGURED) {
      saveDemoSession(null)
      setUser(null)
      setSession(null)
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
