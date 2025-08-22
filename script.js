// ---------------------------
// Supabase Integration (UMD / non-ESM)
// ---------------------------
const SUPABASE_URL = "https://ucqoiltqcblrwkltglos.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcW9pbHRxY2JscndrbHRnbG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3Nzc1NTUsImV4cCI6MjA3MTM1MzU1NX0.d9nusguupaLupLRa1Yn7pBAgzJ9d2eU4Sx-SrgRAFcI";
const IMAGES_BUCKET = "flashcards-images";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------
// Helper: Upload file to Supabase Storage
// ---------------------------
async function testUpload(file) {
  const { data, error } = await supabaseClient.storage
    .from(IMAGES_BUCKET)
    .upload('test-file.png', file);

  if (error) return console.error(error);
  console.log('Upload success', data);
}
