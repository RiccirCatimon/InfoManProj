DROP POLICY IF EXISTS "Employee visibility" ON employee;
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employee visibility" ON employee
FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM "user"
    WHERE "userId" = auth.uid()
    AND user_type IN ('ADMIN', 'SUPERADMIN')
  )
);