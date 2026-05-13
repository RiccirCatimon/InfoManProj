

import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockHREmployees, mockJobHistory } from '../mock/data'

let _employees   = mockHREmployees.map(e => ({ ...e }))
let _jobHistory  = mockJobHistory.map(j => ({ ...j }))

function _cascadeStatus(empno, status) {
  _jobHistory = _jobHistory.map(jh =>
    jh.empno === empno ? { ...jh, record_status: status } : jh
  )
}

const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

export const getEmployees = async (userType) => {
  if (!SUPABASE_CONFIGURED) {
    return userType === 'USER'
      ? _employees.filter(e => e.record_status === 'ACTIVE')
      : [..._employees]
  }

  let query = supabase
    .from('employee_current_job')
    .select('*')
    .order('empno')

  if (userType === 'USER') query = query.eq('record_status', 'ACTIVE')

  const { data, error } = await query
  if (error) throw error
  return data
}

export const addEmployee = async (employee, userId) => {
  const newEmp = {
    ...employee,
    record_status: 'ACTIVE',
    stamp: makeStamp('CREATED', userId),
  }
  if (!SUPABASE_CONFIGURED) {
    _employees = [..._employees, newEmp]
    return newEmp
  }
  const { data, error } = await supabase.from('employee').insert([newEmp]).select().single()
  if (error) throw error
  return data
}

export const updateEmployee = async (empno, updates, userId) => {
  const patch = { ...updates, stamp: makeStamp('UPDATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _employees = _employees.map(e => e.empno === empno ? { ...e, ...patch } : e)
    return _employees.find(e => e.empno === empno)
  }
  const { data, error } = await supabase.from('employee').update(patch).eq('empno', empno).select().single()
  if (error) throw error
  return data
}

export const softDeleteEmployee = async (empno, userId) => {
  const patch = { record_status: 'INACTIVE', stamp: makeStamp('DEACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _employees = _employees.map(e => e.empno === empno ? { ...e, ...patch } : e)
    _cascadeStatus(empno, 'INACTIVE')
    return _employees.find(e => e.empno === empno)
  }

  const { data, error } = await supabase.from('employee').update(patch).eq('empno', empno).select().single()
  if (error) throw error
  return data
}

export const recoverEmployee = async (empno, userId) => {
  const patch = { record_status: 'ACTIVE', sepdate: null, stamp: makeStamp('REACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _employees = _employees.map(e => e.empno === empno ? { ...e, ...patch } : e)
    _cascadeStatus(empno, 'ACTIVE')
    return _employees.find(e => e.empno === empno)
  }
  const { data, error } = await supabase.from('employee').update(patch).eq('empno', empno).select().single()
  if (error) throw error
  return data
}

export const _getMockJobHistory = () => _jobHistory
export const _setMockJobHistory = (jh) => { _jobHistory = jh }
