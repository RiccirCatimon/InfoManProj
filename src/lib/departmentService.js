import { supabase } from './supabase'

export const getDepartments = async () => {
  const { data, error } = await supabase
    .from('department')
    .select('*')
    .order('deptcode')
  if (error) throw error
  return data
}

export const createDepartment = async (dept) => {
  const { data, error } = await supabase.from('department').insert([dept])
  if (error) throw error
  return data
}

export const updateDepartment = async (id, updates) => {
  const { data, error } = await supabase
    .from('department')
    .update(updates)
    .eq('deptcode', id)
  if (error) throw error
  return data
}

export const deleteDepartment = async (id) => {
  const { data, error } = await supabase
    .from('department')
    .delete()
    .eq('deptcode', id)
  if (error) throw error
  return data
}