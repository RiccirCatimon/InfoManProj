import { supabase } from './supabase'

export const getJobs = async (user) => {  
  let query = supabase
    .from('job')
    .select('*')
    .order('jobcode')

 
  if (user?.role === 'USER') {
    query = query.eq('status', 'ACTIVE')
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createJob = async (job) => {
  const { data, error } = await supabase.from('job').insert([job])
  if (error) throw error
  return data
}

export const updateJob = async (id, updates) => {
  const { data, error } = await supabase
    .from('job')
    .update(updates)
    .eq('jobcode', id)
  if (error) throw error
  return data
}

export const deleteJob = async (id) => {
  const { data, error } = await supabase
    .from('job')
    .delete()
    .eq('jobcode', id)
  if (error) throw error
  return data
}
