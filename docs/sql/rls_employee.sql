-- docs/sql/rls_employee.sql
-- M3 PR-01: db/rls-employee
-- RLS policies for the `employee` table
-- Run in Supabase SQL Editor as the postgres (service role) user

-- ── 1. Enable RLS ────────────────────────────────────────────────────────────
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

-- ── 2. SELECT: USER sees ACTIVE only; ADMIN/SUPERADMIN see all ──────────────
CREATE POLICY "employee_select"
ON employee FOR SELECT
USING (
  CASE
    WHEN (auth.jwt() ->> 'user_type') IN ('ADMIN', 'SUPERADMIN') THEN true
    ELSE record_status = 'ACTIVE'
  END
);

-- ── 3. INSERT: requires EMP_ADD = 1 in UserModule_Rights ────────────────────
CREATE POLICY "employee_insert"
ON employee FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE user_id = auth.uid()
      AND right_code = 'EMP_ADD'
      AND has_access = true
  )
);

-- ── 4. UPDATE (edit): requires EMP_EDIT = 1 ─────────────────────────────────
CREATE POLICY "employee_update_edit"
ON employee FOR UPDATE
USING (record_status = 'ACTIVE')
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE user_id = auth.uid()
      AND right_code = 'EMP_EDIT'
      AND has_access = true
  )
);

-- ── 5. UPDATE (deactivate / soft-delete): requires EMP_DEL = 1 ──────────────
CREATE POLICY "employee_update_deactivate"
ON employee FOR UPDATE
USING (true)
WITH CHECK (
  NEW.record_status = 'INACTIVE'
  AND EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE user_id = auth.uid()
      AND right_code = 'EMP_DEL'
      AND has_access = true
  )
);

-- ── 6. UPDATE (recover): ADMIN or SUPERADMIN only ───────────────────────────
CREATE POLICY "employee_update_recover"
ON employee FOR UPDATE
USING (record_status = 'INACTIVE')
WITH CHECK (
  NEW.record_status = 'ACTIVE'
  AND (auth.jwt() ->> 'user_type') IN ('ADMIN', 'SUPERADMIN')
);
