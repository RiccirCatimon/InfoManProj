DROP TRIGGER IF EXISTS on_employee_status_change ON employee;
DROP FUNCTION IF EXISTS cascade_employee_soft_delete();

CREATE OR REPLACE FUNCTION cascade_employee_soft_delete()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.record_status = 'INACTIVE' AND OLD.record_status = 'ACTIVE' THEN
    UPDATE jobhistory
    SET record_status = 'INACTIVE',
        stamp = 'CASCADE-DEL-' || NEW.empno || '-' || NOW()::text
    WHERE empno = NEW.empno;
  END IF;
  
  IF NEW.record_status = 'ACTIVE' AND OLD.record_status = 'INACTIVE' THEN
    UPDATE jobhistory
    SET record_status = 'ACTIVE',
        stamp = 'CASCADE-RECOVER-' || NEW.empno || '-' || NOW()::text
    WHERE empno = NEW.empno;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_employee_status_change
AFTER UPDATE OF record_status ON employee
FOR EACH ROW
EXECUTE FUNCTION cascade_employee_soft_delete();