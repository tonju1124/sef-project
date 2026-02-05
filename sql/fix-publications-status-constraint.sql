-- Fix the publications status check constraint
-- The current constraint is too strict, we need to allow: pending, verified, rejected

-- Drop the existing check constraint
ALTER TABLE publications DROP CONSTRAINT IF EXISTS publications_status_check;

-- Add a new check constraint that allows the correct status values
ALTER TABLE publications 
ADD CONSTRAINT publications_status_check 
CHECK (status IN ('pending', 'verified', 'rejected'));

-- Verify the constraint is in place
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'publications' AND constraint_type = 'CHECK';
