

DROP VIEW IF EXISTS headcount_by_dept;
DROP VIEW IF EXISTS salary_summary_by_job;

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

SELECT 'Headcount by Department' AS report;
SELECT * FROM headcount_by_dept;

SELECT 'Salary Summary by Job' AS report;
SELECT * FROM salary_summary_by_job;