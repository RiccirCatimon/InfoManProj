import { supabase, SUPABASE_CONFIGURED } from './src/lib/supabase.js'
import { mockEmployees } from './src/mock/data.js'

export const getEmployees = async (user) => {
  if (!SUPABASE_CONFIGURED) return mockEmployees

  let query = supabase.from('employee').select('*').order('empno')
  if (user?.user_metadata?.role === 'USER') {
    query = query.is('sepdate', null)
  }
  const { data, error } = await query
  if (error) throw error
  return data
}

export const createEmployee = async (employee) => {
  if (!SUPABASE_CONFIGURED) return employee
  const { data, error } = await supabase.from('employee').insert([employee])
  if (error) throw error
  return data
}

export const updateEmployee = async (id, updates) => {
  if (!SUPABASE_CONFIGURED) return updates
  const { data, error } = await supabase.from('employee').update(updates).eq('empno', id)
  if (error) throw error
  return data
}

export const deleteEmployee = async (id) => {
  if (!SUPABASE_CONFIGURED) return { id }
  const { data, error } = await supabase.from('employee').update({ sepdate: new Date().toISOString() }).eq('empno', id)
  if (error) throw error
  return data
}
