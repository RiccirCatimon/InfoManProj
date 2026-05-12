// src/lib/reportsService.js
// M1 Sprint 3 — PR-02: feat/reports-api
import { supabase, SUPABASE_CONFIGURED } from './supabase'
import { mockHeadcountByDept, mockSalarySummaryByJob, mockJobHistory, mockHREmployees } from '../mock/data'

// getHeadcountByDept() — from headcount_by_dept view
export const getHeadcountByDept = async () => {
  if (!SUPABASE_CONFIGURED) return [...mockHeadcountByDept]
  const { data, error } = await supabase.from('headcount_by_dept').select('*').order('headcount', { ascending: false })
  if (error) throw error
  return data
}

// getSalarySummaryByJob() — from salary_summary_by_job view
export const getSalarySummaryByJob = async () => {
  if (!SUPABASE_CONFIGURED) return [...mockSalarySummaryByJob]
  const { data, error } = await supabase.from('salary_summary_by_job').select('*').order('avg_salary', { ascending: false })
  if (error) throw error
  return data
}

// getEmployeeFullHistory(empNo) — all job history rows for one employee, chronological
export const getEmployeeFullHistory = async (empNo) => {
  if (!SUPABASE_CONFIGURED) {
    const emp = mockHREmployees.find(e => e.empno === empNo)
    const history = mockJobHistory
      .filter(jh => jh.empno === empNo)
      .sort((a, b) => new Date(a.effdate) - new Date(b.effdate))
    return { employee: emp ?? null, history }
  }
  const [{ data: emp }, { data: history, error }] = await Promise.all([
    supabase.from('employee').select('*').eq('empno', empNo).single(),
    supabase.from('jobhistory')
      .select('*, job(jobdesc), department(deptname)')
      .eq('empno', empNo)
      .order('effdate', { ascending: true }),
  ])
  if (error) throw error
  return { employee: emp, history: history ?? [] }
}

// getDashboardStats() — consolidated metrics for the dashboard
export const getDashboardStats = async () => {
  if (!SUPABASE_CONFIGURED) {
    return {
      totalEmployees: mockHREmployees.filter(e => e.record_status === 'ACTIVE').length,
      totalDepts: mockHeadcountByDept.length,
      totalJobs: mockSalarySummaryByJob.length,
      avgSalary: Math.round(mockSalarySummaryByJob.reduce((acc, curr) => acc + curr.avg_salary, 0) / mockSalarySummaryByJob.length)
    }
  }

  const [
    { count: empCount },
    { count: deptCount },
    { count: jobCount },
    { data: salaryData }
  ] = await Promise.all([
    supabase.from('employee').select('*', { count: 'exact', head: true }).eq('record_status', 'ACTIVE'),
    supabase.from('department').select('*', { count: 'exact', head: true }).eq('record_status', 'ACTIVE'),
    supabase.from('job').select('*', { count: 'exact', head: true }).eq('record_status', 'ACTIVE'),
    supabase.from('salary_summary_by_job').select('avg_salary')
  ])

  const avgSalaryTotal = salaryData?.reduce((acc, curr) => acc + curr.avg_salary, 0) || 0
  const avgSalary = salaryData?.length ? Math.round(avgSalaryTotal / salaryData.length) : 0

  return {
    totalEmployees: empCount || 0,
    totalDepts: deptCount || 0,
    totalJobs: jobCount || 0,
    avgSalary
  }
}
