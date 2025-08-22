// ---------------------------
// Supabase Integration
// ---------------------------
const SUPABASE_URL = "https://ucqoiltqcblrwkltglos.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcW9pbHRxY2JscndrbHRnbG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3Nzc1NTUsImV4cCI6MjA3MTM1MzU1NX0.d9nusguupaLupLRa1Yn7pBAgzJ9d2eU4Sx-SrgRAFcI";
const IMAGES_BUCKET = "flashcards-images";

console.log("🔄 Initializing Supabase...");
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("✅ Supabase client created:", supabaseClient);

// ---------------------------
// Test upload function
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 DOM ready, attaching event listener...");

  const uploadBtn = document.getElementById("uploadBtn");
  if (!uploadBtn) {
    console.error("❌ Upload button not found in DOM");
    return;
  }

  uploadBtn.addEventListener("click", async () => {
    console.log("📤 Upload button clicked");

    const fileInput = document.getElementById("fileInput");
    if (!fileInput || !fileInput.files.length) {
      alert("Please select a file first");
      console.warn("⚠️ No file selected");
      return;
    }

    const file = fileInput.files[0];
    console.log("📂 Selected file:", file);

    const fileExt = file.name.split('.').pop();
    const fileName = `test-${Date.now()}.${fileExt}`;

    console.log("📤 Uploading:", fileName);

    const { data, error } = await supabaseClient
      .storage
      .from(IMAGES_BUCKET)
      .upload(fileName, file);

    if (error) {
      console.error("❌ Upload failed:", error);
      document.getElementById("result").textContent = "❌ Upload failed. Check console.";
      return;
    }

    console.log("✅ Upload success, getting public URL...");
    const { data: publicData } = supabaseClient
      .storage
      .from(IMAGES_BUCKET)
      .getPublicUrl(fileName);

    console.log("🌍 Public URL:", publicData.publicUrl);

    document.getElementById("result").innerHTML = `
      ✅ Upload success! <br/>
      <a href="${publicData.publicUrl}" target="_blank">${publicData.publicUrl}</a>
    `;
  });
});
