
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxwlkcpxoojpejiwyzzv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4d2xrY3B4b29qcGVqaXd5enp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDk4MTYsImV4cCI6MjA4MTQyNTgxNn0.WTFvd6QL3TI8n3iHPfDDlqWY6ZkCl24HFnRmY-ZC5ng';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
