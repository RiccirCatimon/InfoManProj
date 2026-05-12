DROP VIEW IF EXISTS employee_current_job;

CREATE VIEW employee_current_job AS
SELECT 
  e.empno,
  e.lastname,
  e.firstname,
  e.gender,
  e.hiredate,
  e.sepdate,
  jh.jobcode,
  j.jobdesc,
  jh.salary,
  jh.deptcode,
  d.deptname,
  jh.effdate AS current_job_effdate
FROM employee e
JOIN jobhistory jh ON jh.empno = e.empno
JOIN job j ON j.jobcode = jh.jobcode
JOIN department d ON d.deptcode = jh.deptcode
WHERE jh.effdate = (
  SELECT MAX(effdate) 
  FROM jobhistory 
  WHERE empno = e.empno 
  AND record_status = 'ACTIVE'
)
AND e.record_status = 'ACTIVE'
AND jh.record_status = 'ACTIVE';