import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vcuymcmkjstdwfvblzfm.supabase.co';
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdXltY21ranN0ZHdmdmJsemZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NTg1NTEsImV4cCI6MjA0NDMzNDU1MX0.AsQTJJr0k0pYJlur0gkdrmei6Om15wPUSN6txbWdP-o';

export const supabase = createClient(supabaseUrl, supabaseAnonkey);
