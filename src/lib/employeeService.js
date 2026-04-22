import { supabase } from './supabase'


export const getEmployees = async (user) => {
  let query = supabase
    .from('employee')
    .select('*')
    .order('empno')

 
  if (user?.role === 'USER') {
    query = query.is('sepdate', null)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}


export const createEmployee = async (employee) => {
  const { data, error } = await supabase.from('employee').insert([employee])
  if (error) throw error
  return data
}


export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase
    .from('employee')
    .update(updates)
    .eq('empno', id)
  if (error) throw error
  return data
}


export const deleteEmployee = async (id) => {
  const { data, error } = await supabase
    .from('employee')
    .update({ sepdate: new Date().toISOString() })
    .eq('empno', id)
  if (error) throw error
  return data
}
