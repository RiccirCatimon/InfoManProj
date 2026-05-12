-- ============================================
-- PR-01: db/views-reports
-- Headcount by Department and Salary Summary by Job
-- Sprint 3 - M3: Avraigne Martinez
-- ============================================

-- Drop existing views if they exist
DROP VIEW IF EXISTS headcount_by_dept;
DROP VIEW IF EXISTS salary_summary_by_job;

-- View 1: Active employee headcount per department
CREATE VIEW headcount_by_dept AS
SELECT 
  d.deptcode,
  d.deptname,
  COUNT(DISTINCT jh.empno) AS active_headcount
FROM department d
LEFT JOIN jobhistory jh ON jh.deptcode = d.deptcode
  AND jh.record_status = 'ACTIVE'
  AND jh.effdate = (
    SELECT MAX(effdate) 
    FROM jobhistory 
    WHERE empno = jh.empno 
    AND record_status = 'ACTIVE'
  )
WHERE d.record_status = 'ACTIVE'
GROUP BY d.deptcode, d.deptname
ORDER BY active_headcount DESC;

-- View 2: Min, Max, Average salary per job
CREATE VIEW salary_summary_by_job AS
SELECT 
  j.jobcode,
  j.jobdesc,
  COUNT(*) AS assignments,
  MIN(jh.salary) AS min_salary,
  MAX(jh.salary) AS max_salary,
  ROUND(AVG(jh.salary), 2) AS avg_salary
FROM job j
JOIN jobhistory jh ON jh.jobcode = j.jobcode
WHERE jh.record_status = 'ACTIVE'
  AND j.record_status = 'ACTIVE'
GROUP BY j.jobcode, j.jobdesc
ORDER BY avg_salary DESC;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Headcount by Department' AS report;
SELECT * FROM headcount_by_dept;

SELECT 'Salary Summary by Job' AS report;
SELECT * FROM salary_summary_by_job;