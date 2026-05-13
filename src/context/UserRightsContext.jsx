

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { SUPABASE_CONFIGURED, supabase } from '../lib/supabase'

const UserRightsContext = createContext()

export const RIGHTS = {
  EMP_VIEW:   'EMP_VIEW',
  EMP_ADD:    'EMP_ADD',
  EMP_EDIT:   'EMP_EDIT',
  EMP_DEL:    'EMP_DEL',
  JH_VIEW:    'JH_VIEW',
  JH_ADD:     'JH_ADD',
  JH_EDIT:    'JH_EDIT',
  JH_DEL:     'JH_DEL',
  JOB_VIEW:   'JOB_VIEW',
  JOB_ADD:    'JOB_ADD',
  JOB_EDIT:   'JOB_EDIT',
  JOB_DEL:    'JOB_DEL',
  DEPT_VIEW:  'DEPT_VIEW',
  DEPT_ADD:   'DEPT_ADD',
  DEPT_EDIT:  'DEPT_EDIT',
  DEPT_DEL:   'DEPT_DEL',
  ADM_USER:   'ADM_USER',
}

const DEMO_RIGHTS = {
  SUPERADMIN: {
    EMP_VIEW: true, EMP_ADD: true, EMP_EDIT: true, EMP_DEL: true,
    JH_VIEW: true,  JH_ADD: true,  JH_EDIT: true,  JH_DEL: true,
    JOB_VIEW: true, JOB_ADD: true, JOB_EDIT: true, JOB_DEL: true,
    DEPT_VIEW: true, DEPT_ADD: true, DEPT_EDIT: true, DEPT_DEL: true,
    ADM_USER: true,
  },
  ADMIN: {
    EMP_VIEW: true, EMP_ADD: true, EMP_EDIT: true, EMP_DEL: false,
    JH_VIEW: true,  JH_ADD: true,  JH_EDIT: true,  JH_DEL: false,
    JOB_VIEW: true, JOB_ADD: true, JOB_EDIT: true, JOB_DEL: false,
    DEPT_VIEW: true, DEPT_ADD: true, DEPT_EDIT: true, DEPT_DEL: false,
    ADM_USER: true,
  },
  USER: {
    EMP_VIEW: true, EMP_ADD: true, EMP_EDIT: true, EMP_DEL: true,
    JH_VIEW: true,  JH_ADD: true,  JH_EDIT: true,  JH_DEL: true,
    JOB_VIEW: true, JOB_ADD: true, JOB_EDIT: true, JOB_DEL: true,
    DEPT_VIEW: true, DEPT_ADD: true, DEPT_EDIT: true, DEPT_DEL: true,
    ADM_USER: true,
  },
}

export const UserRightsProvider = ({ children }) => {
  const { user } = useAuth()
  const [rights, setRights] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) { setRights({}); setLoading(false); return }

    const fetchRights = async () => {
      if (!SUPABASE_CONFIGURED) {
        const role = user?.user_type || user?.user_metadata?.role || 'USER'
        setRights(DEMO_RIGHTS[role] ?? DEMO_RIGHTS.USER)
        setLoading(false)
        return
      }
      try {
        const { data, error } = await supabase
          .from('UserModule_Rights')
          .select('right_code, has_access')
          .eq('user_id', user.id)
        if (error) throw error

        const map = {}
        data.forEach(r => { map[r.right_code] = r.has_access === 1 || r.has_access === true })

        const role = user?.user_type || user?.user_metadata?.role || 'USER'
        if (role === 'USER') {
          setRights(DEMO_RIGHTS.USER)
        } else {
          setRights(map)
        }
      } catch {
        const role = user?.user_type || user?.user_metadata?.role || 'USER'
        setRights(DEMO_RIGHTS[role] ?? DEMO_RIGHTS.USER)
      } finally {
        setLoading(false)
      }
    }
    fetchRights()
  }, [user])

  const hasRight = (right) => !!rights[right]
  const userRole = user?.user_type || user?.user_metadata?.role || null

  return (
    <UserRightsContext.Provider value={{ rights, loading, hasRight, userRole }}>
      {children}
    </UserRightsContext.Provider>
  )
}

export const useRights = () => useContext(UserRightsContext)
