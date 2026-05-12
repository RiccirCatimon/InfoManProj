// src/lib/jobHistoryService.js
// M1 — PR-02: feat/jobhistory-api
import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { _getMockJobHistory, _setMockJobHistory } from './employeeService'

// Helper: audit trail stamp (Section 8.1)
const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

// ─────────────────────────────────────────────────────────────────────────────
// getJobHistory(empNo, userType)
//   empNo = null → return all rows (used by DeletedItemsPage)
//   USER        → only record_status = 'ACTIVE'
//   ADMIN/SUPERADMIN → all rows
// ─────────────────────────────────────────────────────────────────────────────
export const getJobHistory = async (empNo, userType) => {
  if (!SUPABASE_CONFIGURED) {
    let rows = _getMockJobHistory()
    if (empNo) rows = rows.filter(jh => jh.empno === empNo)
    if (userType === 'USER') rows = rows.filter(jh => jh.record_status === 'ACTIVE')
    return [...rows].sort((a, b) => new Date(b.effdate) - new Date(a.effdate))
  }

  let query = supabase
    .from('jobhistory')
    .select('*, job(jobdesc), department(deptname)')
    .order('effdate', { ascending: false })

  if (empNo) query = query.eq('empno', empNo)
  if (userType === 'USER') query = query.eq('record_status', 'ACTIVE')

  const { data, error } = await query
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// addJobHistory(record, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const addJobHistory = async (record, userId) => {
  const newRow = {
    ...record,
    record_status: 'ACTIVE',
    stamp: makeStamp('CREATED', userId),
  }
  if (!SUPABASE_CONFIGURED) {
    const rows = _getMockJobHistory()
    const withId = { ...newRow, id: Date.now() }
    _setMockJobHistory([...rows, withId])
    return withId
  }
  const { data, error } = await supabase.from('jobhistory').insert([newRow]).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// updateJobHistory(id, updates, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const updateJobHistory = async (id, updates, userId) => {
  const patch = { ...updates, stamp: makeStamp('UPDATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _setMockJobHistory(_getMockJobHistory().map(jh => jh.id === id ? { ...jh, ...patch } : jh))
    return _getMockJobHistory().find(jh => jh.id === id)
  }
  const { data, error } = await supabase.from('jobhistory').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// softDeleteJobHistory(id, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const softDeleteJobHistory = async (id, userId) => {
  const patch = { record_status: 'INACTIVE', stamp: makeStamp('DEACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _setMockJobHistory(_getMockJobHistory().map(jh => jh.id === id ? { ...jh, ...patch } : jh))
    return _getMockJobHistory().find(jh => jh.id === id)
  }
  const { data, error } = await supabase.from('jobhistory').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// recoverJobHistory(id, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const recoverJobHistory = async (id, userId) => {
  const patch = { record_status: 'ACTIVE', stamp: makeStamp('REACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _setMockJobHistory(_getMockJobHistory().map(jh => jh.id === id ? { ...jh, ...patch } : jh))
    return _getMockJobHistory().find(jh => jh.id === id)
  }
  const { data, error } = await supabase.from('jobhistory').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}
