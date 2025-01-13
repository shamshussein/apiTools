const { spawn } = require("child_process");

async function downloadVideo(videoUrl, res) {
  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required." });
  }

  console.log("Starting download for:", videoUrl);

  const process = spawn("yt-dlp", ["-o", "-", videoUrl]);

  process.stdout.on("data", (chunk) => {
    res.write(chunk); 
  });

  process.stderr.on("data", (data) => {
    console.error("yt-dlp error:", data.toString());
  });

  process.on("close", (code) => {
    if (code === 0) {
      console.log("Download complete.");
      res.end(); 
    } else {
      console.error(`yt-dlp exited with code ${code}`);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download video." });
      }
    }
  });

  process.on("error", (err) => {
    console.error("yt-dlp process error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error during video download." });
    }
  });
}

module.exports = downloadVideo;
