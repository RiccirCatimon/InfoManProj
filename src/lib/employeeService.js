import { supabase } from './supabase'

// 🔹 READ — KEY LOGIC: only show ACTIVE (no sepdate) for regular users
export const getEmployees = async (user) => {
  let query = supabase
    .from('employee')
    .select('*')
    .order('empno')

  // ✅ THIS IS THE REQUIRED LOGIC YOUR LEADER WANTS
  if (user?.role === 'USER') {
    query = query.is('sepdate', null)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

// 🔹 CREATE
export const createEmployee = async (employee) => {
  const { data, error } = await supabase.from('employee').insert([employee])
  if (error) throw error
  return data
}

// 🔹 UPDATE
export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase
    .from('employee')
    .update(updates)
    .eq('empno', id)
  if (error) throw error
  return data
}

// 🔹 SOFT DELETE (sets sepdate = today, marks as inactive)
export const deleteEmployee = async (id) => {
  const { data, error } = await supabase
    .from('employee')
    .update({ sepdate: new Date().toISOString() })
    .eq('empno', id)
  if (error) throw error
  return data
}