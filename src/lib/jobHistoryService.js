import { supabase } from './supabase'

export const getJobHistory = async (user) => {
  let query = supabase
    .from('job_history')
    .select('*')
    .order('empno')

  // Only show active records to regular users
  if (user?.role === 'USER') {
    query = query.is('sepdate', null) // adjust column name if different
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createJobHistory = async (record) => {
  const { data, error } = await supabase.from('job_history').insert([record])
  if (error) throw error
  return data
}

export const updateJobHistory = async (id, updates) => {
  const { data, error } = await supabase
    .from('job_history')
    .update(updates)
    .eq('id', id) // change 'id' to your actual PK column
  if (error) throw error
  return data
}

export const deleteJobHistory = async (id) => {
  const { data, error } = await supabase
    .from('job_history')
    .delete()
    .eq('id', id)
  if (error) throw error
  return data
}