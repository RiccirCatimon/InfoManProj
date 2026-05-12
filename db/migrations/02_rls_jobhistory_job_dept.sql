DROP POLICY IF EXISTS "JobHistory visibility" ON jobhistory;
DROP POLICY IF EXISTS "Job visibility" ON job;
DROP POLICY IF EXISTS "Department visibility" ON department;

ALTER TABLE jobhistory ENABLE ROW LEVEL SECURITY;
ALTER TABLE job ENABLE ROW LEVEL SECURITY;
ALTER TABLE department ENABLE ROW LEVEL SECURITY;

CREATE POLICY "JobHistory visibility" ON jobhistory
FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM "user"
    WHERE "userId" = auth.uid()
    AND user_type IN ('ADMIN', 'SUPERADMIN')
  )
);

CREATE POLICY "Job visibility" ON job
FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM "user"
    WHERE "userId" = auth.uid()
    AND user_type IN ('ADMIN', 'SUPERADMIN')
  )
);

CREATE POLICY "Department visibility" ON department
FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM "user"
    WHERE "userId" = auth.uid()
    AND user_type IN ('ADMIN', 'SUPERADMIN')
  )
);