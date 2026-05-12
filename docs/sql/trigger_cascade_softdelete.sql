-- docs/sql/trigger_cascade_softdelete.sql
-- M3 PR-03: db/trigger-cascade-softdelete
-- Cascade trigger: employee record_status → jobhistory record_status sync

CREATE OR REPLACE FUNCTION fn_cascade_employee_status()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Only fire when record_status actually changed
  IF OLD.record_status IS DISTINCT FROM NEW.record_status THEN
    UPDATE jobhistory
    SET record_status = NEW.record_status,
        updated_at    = NOW()
    WHERE empno = NEW.empno;
  END IF;
  RETURN NEW;
END;
$$;

-- Attach trigger to employee AFTER UPDATE
DROP TRIGGER IF EXISTS trg_cascade_employee_status ON employee;

CREATE TRIGGER trg_cascade_employee_status
AFTER UPDATE OF record_status ON employee
FOR EACH ROW
EXECUTE FUNCTION fn_cascade_employee_status();

-- ── Verification query (run after soft-deleting employee 00001) ───────────────
-- SELECT empno, record_status FROM jobhistory WHERE empno = '00001';
-- Expected: all rows show INACTIVE after employee is set to INACTIVE
-- Expected: all rows show ACTIVE after employee is recovered
