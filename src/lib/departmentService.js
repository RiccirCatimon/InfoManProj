

import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockDepts } from '../mock/data'

let _depts = mockDepts.map(d => ({ ...d }))

const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

export const getDepts = async (userType) => {
  if (!SUPABASE_CONFIGURED) {
    return userType === 'USER'
      ? _depts.filter(d => d.record_status === 'ACTIVE')
      : [..._depts]
  }
  let query = supabase.from('department').select('*').order('deptcode')
  if (userType === 'USER') query = query.eq('record_status', 'ACTIVE')
  const { data, error } = await query
  if (error) throw error
  return data
}

export const addDept = async (dept, userId) => {
  const newDept = { ...dept, record_status: 'ACTIVE', stamp: makeStamp('CREATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _depts = [..._depts, newDept]
    return newDept
  }
  const { data, error } = await supabase.from('department').insert([newDept]).select().single()
  if (error) throw error
  return data
}

export const updateDept = async (deptcode, updates, userId) => {
  const patch = { ...updates, stamp: makeStamp('UPDATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _depts = _depts.map(d => d.deptcode === deptcode ? { ...d, ...patch } : d)
    return _depts.find(d => d.deptcode === deptcode)
  }
  const { data, error } = await supabase.from('department').update(patch).eq('deptcode', deptcode).select().single()
  if (error) throw error
  return data
}

export const softDeleteDept = async (deptcode, userId) => {
  const patch = { record_status: 'INACTIVE', stamp: makeStamp('DEACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _depts = _depts.map(d => d.deptcode === deptcode ? { ...d, ...patch } : d)
    return _depts.find(d => d.deptcode === deptcode)
  }
  const { data, error } = await supabase.from('department').update(patch).eq('deptcode', deptcode).select().single()
  if (error) throw error
  return data
}

export const recoverDept = async (deptcode, userId) => {
  const patch = { record_status: 'ACTIVE', stamp: makeStamp('REACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _depts = _depts.map(d => d.deptcode === deptcode ? { ...d, ...patch } : d)
    return _depts.find(d => d.deptcode === deptcode)
  }
  const { data, error } = await supabase.from('department').update(patch).eq('deptcode', deptcode).select().single()
  if (error) throw error
  return data
}
