const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseUrl !== 'https://your-supabase-project-id.supabase.co') {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Supabase client initialized.');
  } catch (err) {
    console.warn('⚠️ Supabase client failed to initialize:', err.message);
  }
} else {
  console.warn('ℹ️ Supabase URL not configured in .env. Operating in memory/mock fallback mode.');
}

module.exports = supabase;
