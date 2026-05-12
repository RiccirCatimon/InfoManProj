// src/lib/employeeService.js
// M1 — PR-01: feat/employee-api
import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockHREmployees, mockJobHistory } from '../mock/data'

// In-memory mock store (shared reference so cascade mutations are reflected)
let _employees   = mockHREmployees.map(e => ({ ...e }))
let _jobHistory  = mockJobHistory.map(j => ({ ...j }))

// Helper: cascade employee record_status → matching jobHistory rows
function _cascadeStatus(empno, status) {
  _jobHistory = _jobHistory.map(jh =>
    jh.empno === empno ? { ...jh, record_status: status } : jh
  )
}

// Helper: audit trail stamp (Section 8.1)
const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

// ─────────────────────────────────────────────────────────────────────────────
// getEmployees(userType)
//   USER      → only record_status = 'ACTIVE'
//   ADMIN / SUPERADMIN → all rows
// ─────────────────────────────────────────────────────────────────────────────
export const getEmployees = async (userType) => {
  if (!SUPABASE_CONFIGURED) {
    return userType === 'USER'
      ? _employees.filter(e => e.record_status === 'ACTIVE')
      : [..._employees]
  }

  let query = supabase
    .from('employee_current_job')   // SQL view with jobDesc + deptName joined
    .select('*')
    .order('empno')

  if (userType === 'USER') query = query.eq('record_status', 'ACTIVE')

  const { data, error } = await query
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// addEmployee(employee, userId)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// updateEmployee(empno, updates, userId)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// softDeleteEmployee(empno, userId) — sets record_status = 'INACTIVE', cascades to JH
// ─────────────────────────────────────────────────────────────────────────────
export const softDeleteEmployee = async (empno, userId) => {
  const patch = { record_status: 'INACTIVE', stamp: makeStamp('DEACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _employees = _employees.map(e => e.empno === empno ? { ...e, ...patch } : e)
    _cascadeStatus(empno, 'INACTIVE')
    return _employees.find(e => e.empno === empno)
  }
  // Supabase: RLS trigger handles cascade on the DB side
  const { data, error } = await supabase.from('employee').update(patch).eq('empno', empno).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// recoverEmployee(empno, userId) — sets record_status = 'ACTIVE', cascades restore
// ─────────────────────────────────────────────────────────────────────────────
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

// Export internal store accessor for jobHistoryService to share the same mock
export const _getMockJobHistory = () => _jobHistory
export const _setMockJobHistory = (jh) => { _jobHistory = jh }
