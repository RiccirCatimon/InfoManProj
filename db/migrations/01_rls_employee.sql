DROP POLICY IF EXISTS "Employee visibility" ON employee;
DROP POLICY IF EXISTS "Employee all access" ON employee;
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employee all access" ON employee
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);