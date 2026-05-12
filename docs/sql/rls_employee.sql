-- docs/sql/rls_employee.sql
-- Fixed version for new schema

-- 1. Enable RLS
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

-- 2. SELECT
CREATE POLICY "employee_select" ON employee FOR SELECT USING (
  CASE WHEN (auth.jwt() ->> 'user_type') IN ('ADMIN', 'SUPERADMIN') THEN true
       ELSE record_status = 'ACTIVE' END
);

-- 3. INSERT
CREATE POLICY "employee_insert" ON employee FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE "user_id" = auth.uid() AND module_name = 'Emp_Mod' AND add_right = 1)
);

-- 4. UPDATE (edit)
CREATE POLICY "employee_update_edit" ON employee FOR UPDATE USING (record_status = 'ACTIVE')
WITH CHECK (EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE "user_id" = auth.uid() AND module_name = 'Emp_Mod' AND edit_right = 1));

-- 5. UPDATE (deactivate)
CREATE POLICY "employee_update_deactivate" ON employee FOR UPDATE USING (true)
WITH CHECK (NEW.record_status = 'INACTIVE' AND EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE "user_id" = auth.uid() AND module_name = 'Emp_Mod' AND del_right = 1));

-- 6. UPDATE (recover)
CREATE POLICY "employee_update_recover" ON employee FOR UPDATE USING (record_status = 'INACTIVE')
WITH CHECK (NEW.record_status = 'ACTIVE' AND (auth.jwt() ->> 'user_type') IN ('ADMIN', 'SUPERADMIN'));
