-- ============================================
-- PR-02: db/rls-admin-user-mgmt
-- RLS Policies to protect SUPERADMIN accounts
-- Sprint 3 - M3: Avraigne Martinez
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin update users" ON "user";
DROP POLICY IF EXISTS "Admin update user rights" ON "UserModule_Rights";

-- Enable RLS on user and UserModule_Rights tables
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserModule_Rights" ENABLE ROW LEVEL SECURITY;

-- Policy: ADMIN can update users but NOT SUPERADMIN users
CREATE POLICY "Admin update users" ON "user"
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "user" u
    WHERE u."userId" = auth.uid()
    AND u.user_type IN ('ADMIN', 'SUPERADMIN')
  )
)
WITH CHECK (
  user_type != 'SUPERADMIN'
  OR EXISTS (
    SELECT 1 FROM "user" u
    WHERE u."userId" = auth.uid()
    AND u.user_type = 'SUPERADMIN'
  )
);

-- Policy: ADMIN cannot modify SUPERADMIN rights
CREATE POLICY "Admin update user rights" ON "UserModule_Rights"
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "user" u
    WHERE u."userId" = auth.uid()
    AND u.user_type IN ('ADMIN', 'SUPERADMIN')
  )
)
WITH CHECK (
  "userId" NOT IN (
    SELECT "userId" FROM "user" WHERE user_type = 'SUPERADMIN'
  )
  OR EXISTS (
    SELECT 1 FROM "user" u
    WHERE u."userId" = auth.uid()
    AND u.user_type = 'SUPERADMIN'
  )
);

-- Verify policies
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('user', 'UserModule_Rights');