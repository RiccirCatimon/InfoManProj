-- Relaxed for now as requested
DROP POLICY IF EXISTS "Admin update users" ON "user";
DROP POLICY IF EXISTS "Admin update user rights" ON "UserModule_Rights";
DROP POLICY IF EXISTS "User all access" ON "users";
DROP POLICY IF EXISTS "Rights all access" ON "UserModule_Rights";

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserModule_Rights" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User all access" ON "users" FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Rights all access" ON "UserModule_Rights" FOR ALL TO authenticated USING (true) WITH CHECK (true);