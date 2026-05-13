

import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockJobs } from '../mock/data'

let _jobs = mockJobs.map(j => ({ ...j }))

const makeStamp = (action, userId = 'admin') => `${action}-${userId.slice(0, 5)}-${new Date().toISOString().slice(0, 10)}`

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
