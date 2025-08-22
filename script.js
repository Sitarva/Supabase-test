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
async function uploadFileToSupabase(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { data, error } = await supabaseClient.storage
    .from(IMAGES_BUCKET)
    .upload(fileName, file);

  if (error) {
    console.error("Supabase upload error:", error);
    return null;
  }

  const { data: urlData, error: urlError } = supabaseClient.storage
    .from(IMAGES_BUCKET)
    .getPublicUrl(fileName);

  if (urlError) {
    console.error("Supabase public URL error:", urlError);
    return null;
  }

  return urlData.publicUrl;
}

// ---------------------------
// Test upload button
// ---------------------------
document.getElementById("testUploadBtn")?.addEventListener("click", async () => {
  const fileInput = document.querySelector(".image-upload");
  if (!fileInput?.files?.[0]) return alert("Select a file first!");
  
  const publicUrl = await uploadFileToSupabase(fileInput.files[0]);
  if (publicUrl) {
    console.log("✅ Supabase upload successful! URL:", publicUrl);
    alert(`Test upload done! Check console for URL.`);
  } else {
    alert("Upload failed. See console for details.");
  }
});
