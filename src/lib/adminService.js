

import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockUsers } from '../mock/data'

let _users = mockUsers.map(u => ({ ...u }))

export const getUsers = async () => {
  if (!SUPABASE_CONFIGURED) return [..._users]
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, user_type, record_status, created_at')
    .order('created_at')
  if (error) throw error
  return data
}

export const activateUser = async (id) => {
  if (!SUPABASE_CONFIGURED) {
    const target = _users.find(u => u.id === id)
    if (target?.user_type === 'SUPERADMIN') throw new Error('Cannot modify SUPERADMIN accounts.')
    _users = _users.map(u => u.id === id ? { ...u, record_status: 'ACTIVE' } : u)
    return _users.find(u => u.id === id)
  }
  const { data: target } = await supabase.from('users').select('user_type').eq('id', id).single()
  if (target?.user_type === 'SUPERADMIN') throw new Error('Cannot modify SUPERADMIN accounts.')
  const { data, error } = await supabase.from('users').update({ record_status: 'ACTIVE' }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const deactivateUser = async (id) => {
  if (!SUPABASE_CONFIGURED) {
    const target = _users.find(u => u.id === id)
    if (target?.user_type === 'SUPERADMIN') throw new Error('Cannot modify SUPERADMIN accounts.')
    _users = _users.map(u => u.id === id ? { ...u, record_status: 'INACTIVE' } : u)
    return _users.find(u => u.id === id)
  }
  const { data: target } = await supabase.from('users').select('user_type').eq('id', id).single()
  if (target?.user_type === 'SUPERADMIN') throw new Error('Cannot modify SUPERADMIN accounts.')
  const { data, error } = await supabase.from('users').update({ record_status: 'INACTIVE' }).eq('id', id).select().single()
  if (error) throw error
  return data
}
