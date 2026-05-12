// src/lib/jobService.js
// M1 — PR-03: feat/job-dept-api
import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockJobs } from '../mock/data'

let _jobs = mockJobs.map(j => ({ ...j }))

// Helper: audit trail stamp (Section 8.1)
const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

// ─────────────────────────────────────────────────────────────────────────────
// getJobs(userType)
// ─────────────────────────────────────────────────────────────────────────────
export const getJobs = async (userType) => {
  if (!SUPABASE_CONFIGURED) {
    return userType === 'USER'
      ? _jobs.filter(j => j.record_status === 'ACTIVE')
      : [..._jobs]
  }
  let query = supabase.from('job').select('*').order('jobcode')
  if (userType === 'USER') query = query.eq('record_status', 'ACTIVE')
  const { data, error } = await query
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// addJob(job, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const addJob = async (job, userId) => {
  const newJob = { ...job, record_status: 'ACTIVE', stamp: makeStamp('CREATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _jobs = [..._jobs, newJob]
    return newJob
  }
  const { data, error } = await supabase.from('job').insert([newJob]).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// updateJob(jobcode, updates, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const updateJob = async (jobcode, updates, userId) => {
  const patch = { ...updates, stamp: makeStamp('UPDATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _jobs = _jobs.map(j => j.jobcode === jobcode ? { ...j, ...patch } : j)
    return _jobs.find(j => j.jobcode === jobcode)
  }
  const { data, error } = await supabase.from('job').update(patch).eq('jobcode', jobcode).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// softDeleteJob(jobcode, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const softDeleteJob = async (jobcode, userId) => {
  const patch = { record_status: 'INACTIVE', stamp: makeStamp('DEACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _jobs = _jobs.map(j => j.jobcode === jobcode ? { ...j, ...patch } : j)
    return _jobs.find(j => j.jobcode === jobcode)
  }
  const { data, error } = await supabase.from('job').update(patch).eq('jobcode', jobcode).select().single()
  if (error) throw error
  return data
}

// ─────────────────────────────────────────────────────────────────────────────
// recoverJob(jobcode, userId)
// ─────────────────────────────────────────────────────────────────────────────
export const recoverJob = async (jobcode, userId) => {
  const patch = { record_status: 'ACTIVE', stamp: makeStamp('REACTIVATED', userId) }
  if (!SUPABASE_CONFIGURED) {
    _jobs = _jobs.map(j => j.jobcode === jobcode ? { ...j, ...patch } : j)
    return _jobs.find(j => j.jobcode === jobcode)
  }
  const { data, error } = await supabase.from('job').update(patch).eq('jobcode', jobcode).select().single()
  if (error) throw error
  return data
}
