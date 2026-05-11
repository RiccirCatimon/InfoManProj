import { supabase } from './supabase'

export const getDepartments = async (user) => {  // ✅ added user parameter
  let query = supabase
    .from('department')
    .select('*')
    .order('deptcode')

  // ✅ KEY LOGIC — same as employeeService
  if (user?.role === 'USER') {
    query = query.eq('status', 'ACTIVE')
  }

  const { data, error } = await query
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