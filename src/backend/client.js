import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wicsftixufrnmpefdqhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpY3NmdGl4dWZybm1wZWZkcWhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDE1Njg4OCwiZXhwIjoyMDE1NzMyODg4fQ.U1hJffmKp2HprWpgTo5Gx9AoALoXP1-TRi8U4WysjGs';

export const supabase = createClient(supabaseUrl, supabaseKey);
