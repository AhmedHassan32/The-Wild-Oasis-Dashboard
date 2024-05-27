import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sfxqhhlxkwiagdmihdlu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmeHFoaGx4a3dpYWdkbWloZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4OTgwNjMsImV4cCI6MjAzMDQ3NDA2M30.7n75-iYlAwPmIzx4eexe7_uBOt2lbra--2MeFd-rzys";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
