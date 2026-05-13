DROP POLICY IF EXISTS "JobHistory visibility" ON jobhistory;
DROP POLICY IF EXISTS "Job visibility" ON job;
DROP POLICY IF EXISTS "Department visibility" ON department;
DROP POLICY IF EXISTS "JobHistory all access" ON jobhistory;
DROP POLICY IF EXISTS "Job all access" ON job;
DROP POLICY IF EXISTS "Department all access" ON department;

ALTER TABLE jobhistory ENABLE ROW LEVEL SECURITY;
ALTER TABLE job ENABLE ROW LEVEL SECURITY;
ALTER TABLE department ENABLE ROW LEVEL SECURITY;

CREATE POLICY "JobHistory all access" ON jobhistory FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Job all access" ON job FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Department all access" ON department FOR ALL TO authenticated USING (true) WITH CHECK (true);