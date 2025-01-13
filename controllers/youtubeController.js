const { spawn } = require("child_process");

async function downloadVideo(videoUrl, res) {
  try {
    console.log("Received URL:", videoUrl);

    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL is required." });
    }

    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.setHeader("Content-Type", "video/mp4");

    console.log("Starting download...");

    const process = spawn("yt-dlp", ["-o", "-", videoUrl]);

    process.stdout.pipe(res);

    process.stderr.on("data", (data) => {
      console.error("Error output:", data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log("Download completed successfully.");
      } else {
        console.error(`Download process exited with code: ${code}`);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to download video." });
        }
      }
    });

    process.on("error", (err) => {
      console.error("Process error:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to stream video." });
      }
    });
  } catch (err) {
    console.error("Error in downloadVideo:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to download video." });
    }
  }
}

module.exports = downloadVideo;
