-- docs/sql/view_employee_current_job.sql
-- M3 PR-04: db/view-employee-current-job
-- SQL view: employee_current_job — latest ACTIVE jobhistory per employee
-- joined with job.jobdesc and department.deptname

CREATE OR REPLACE VIEW employee_current_job AS
SELECT
  e.empno,
  e.lastname,
  e.firstname,
  e.gender,
  e.birthdate,
  e.hiredate,
  e.sepdate,
  e.record_status,
  e.created_by,
  e.created_at,
  e.updated_by,
  e.updated_at,
  j.jobdesc   AS current_jobdesc,
  d.deptname  AS current_deptname,
  jh.jobcode  AS current_jobcode,
  jh.deptcode AS current_deptcode,
  jh.effdate  AS current_effdate,
  jh.salary   AS current_salary
FROM employee e
LEFT JOIN LATERAL (
  SELECT *
  FROM jobhistory
  WHERE empno = e.empno
    AND record_status = 'ACTIVE'
  ORDER BY effdate DESC
  LIMIT 1
) jh ON true
LEFT JOIN job        j ON j.jobcode  = jh.jobcode
LEFT JOIN department d ON d.deptcode = jh.deptcode;

-- ── Sprint 3 Report Views ─────────────────────────────────────────────────────

-- headcount_by_dept: active employee count per department
CREATE OR REPLACE VIEW headcount_by_dept AS
SELECT
  d.deptcode,
  d.deptname,
  COUNT(DISTINCT ecj.empno) AS headcount
FROM department d
LEFT JOIN employee_current_job ecj
  ON ecj.current_deptcode = d.deptcode
  AND ecj.record_status = 'ACTIVE'
WHERE d.record_status = 'ACTIVE'
GROUP BY d.deptcode, d.deptname
ORDER BY headcount DESC;

-- salary_summary_by_job: min/max/avg salary per active job from active jobhistory
CREATE OR REPLACE VIEW salary_summary_by_job AS
SELECT
  j.jobcode,
  j.jobdesc,
  MIN(jh.salary) AS min_salary,
  MAX(jh.salary) AS max_salary,
  ROUND(AVG(jh.salary), 2) AS avg_salary
FROM job j
JOIN jobhistory jh ON jh.jobcode = j.jobcode AND jh.record_status = 'ACTIVE'
WHERE j.record_status = 'ACTIVE'
GROUP BY j.jobcode, j.jobdesc
ORDER BY avg_salary DESC;
