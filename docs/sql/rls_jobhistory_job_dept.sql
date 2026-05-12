-- docs/sql/rls_jobhistory_job_dept.sql
-- M3 PR-02: db/rls-jobhistory-job-dept
-- Same 4-policy pattern applied to jobhistory, job, and department

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: jobhistory
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE jobhistory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jh_select" ON jobhistory FOR SELECT USING (
  CASE WHEN (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN') THEN true
       ELSE record_status = 'ACTIVE' END
);
CREATE POLICY "jh_insert" ON jobhistory FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JH_ADD' AND has_access=true)
);
CREATE POLICY "jh_update_edit" ON jobhistory FOR UPDATE
USING (record_status='ACTIVE')
WITH CHECK (EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JH_EDIT' AND has_access=true));

CREATE POLICY "jh_update_deactivate" ON jobhistory FOR UPDATE USING (true)
WITH CHECK (NEW.record_status='INACTIVE' AND EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JH_DEL' AND has_access=true));

CREATE POLICY "jh_update_recover" ON jobhistory FOR UPDATE USING (record_status='INACTIVE')
WITH CHECK (NEW.record_status='ACTIVE' AND (auth.jwt()->>'user_type') IN ('ADMIN','SUPERADMIN'));

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: job
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE job ENABLE ROW LEVEL SECURITY;

CREATE POLICY "job_select" ON job FOR SELECT USING (
  CASE WHEN (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN') THEN true
       ELSE record_status = 'ACTIVE' END
);
CREATE POLICY "job_insert" ON job FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JOB_ADD' AND has_access=true)
);
CREATE POLICY "job_update_edit" ON job FOR UPDATE USING (record_status='ACTIVE')
WITH CHECK (EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JOB_EDIT' AND has_access=true));

CREATE POLICY "job_update_deactivate" ON job FOR UPDATE USING (true)
WITH CHECK (NEW.record_status='INACTIVE' AND EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='JOB_DEL' AND has_access=true));

CREATE POLICY "job_update_recover" ON job FOR UPDATE USING (record_status='INACTIVE')
WITH CHECK (NEW.record_status='ACTIVE' AND (auth.jwt()->>'user_type') IN ('ADMIN','SUPERADMIN'));

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: department
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE department ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dept_select" ON department FOR SELECT USING (
  CASE WHEN (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN') THEN true
       ELSE record_status = 'ACTIVE' END
);
CREATE POLICY "dept_insert" ON department FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='DEPT_ADD' AND has_access=true)
);
CREATE POLICY "dept_update_edit" ON department FOR UPDATE USING (record_status='ACTIVE')
WITH CHECK (EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='DEPT_EDIT' AND has_access=true));

CREATE POLICY "dept_update_deactivate" ON department FOR UPDATE USING (true)
WITH CHECK (NEW.record_status='INACTIVE' AND EXISTS (SELECT 1 FROM "UserModule_Rights" WHERE user_id=auth.uid() AND right_code='DEPT_DEL' AND has_access=true));

CREATE POLICY "dept_update_recover" ON department FOR UPDATE USING (record_status='INACTIVE')
WITH CHECK (NEW.record_status='ACTIVE' AND (auth.jwt()->>'user_type') IN ('ADMIN','SUPERADMIN'));
