const express = require("express");
const downloadVideo = require("../controllers/youtubeController");
const router = express.Router();

router.get("/download", async (req, res) => {
  try {
    const { videoUrl } = req.query;

    if (!videoUrl) {
      return res.status(400).json({ error: "You must provide a video URL." });
    }

    console.log("Handling video download request...");
    await downloadVideo(videoUrl, res);
  } catch (err) {
    console.error("Error in route:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
