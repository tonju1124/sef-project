-- Configure RLS policies for publications table - SIMPLIFIED VERSION
-- Everyone can see verified and non-hidden publications
-- Users can upload and manage their own publications
-- Coordinators can verify publications

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Everyone can view verified publications" ON publications;
DROP POLICY IF EXISTS "Users can view their own publications" ON publications;
DROP POLICY IF EXISTS "Admins can view all publications" ON publications;
DROP POLICY IF EXISTS "Authenticated users can insert publications" ON publications;
DROP POLICY IF EXISTS "Users can update their own publications" ON publications;
DROP POLICY IF EXISTS "Coordinators can verify publications" ON publications;

-- Policy 1: EVERYONE can view verified and non-hidden publications (public data, always allow)
CREATE POLICY "Everyone can view verified publications" ON publications
FOR SELECT
USING (
  status = 'verified' AND is_hidden = false
);

-- Policy 2: Authenticated users can view their own publications
CREATE POLICY "Users can view their own publications" ON publications
FOR SELECT
USING (
  auth.uid() IS NOT NULL AND author_id = auth.uid()
);

-- Policy 3: Admins can view all publications (for management)
CREATE POLICY "Admins can view all publications" ON publications
FOR SELECT
USING (
  auth.uid() IS NOT NULL AND 
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policy 4: Authenticated users can upload publications
CREATE POLICY "Authenticated users can insert publications" ON publications
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND author_id = auth.uid()
);

-- Policy 5: Users can update their own publications
CREATE POLICY "Users can update their own publications" ON publications
FOR UPDATE
USING (
  author_id = auth.uid()
)
WITH CHECK (
  author_id = auth.uid()
);

-- Policy 6: Coordinators can verify/reject publications (update status)
CREATE POLICY "Coordinators can verify publications" ON publications
FOR UPDATE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'coordinator'
)
WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'coordinator'
);

-- Enable RLS on publications table
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
