// Supabase credentials
  const SUPABASE_URL = "https://ucqoiltqcblrwkltglos.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcW9pbHRxY2JscndrbHRnbG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3Nzc1NTUsImV4cCI6MjA3MTM1MzU1NX0.d9nusguupaLupLRa1Yn7pBAgzJ9d2eU4Sx-SrgRAFcI";

  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log("Supabase initialized!", supabase);

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files[0]) return alert("Please select a file first.");

  const file = fileInput.files[0];
  const fileName = `${Date.now()}-${file.name}`;

  try {
    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: urlData, error: urlError } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (urlError) throw urlError;

    document.getElementById("result").innerHTML = `
      ✅ Upload successful! <br>
      <a href="${urlData.publicUrl}" target="_blank">View File</a>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("result").textContent = `❌ Error: ${err.message}`;
  }
});
