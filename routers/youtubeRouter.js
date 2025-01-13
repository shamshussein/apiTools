const express = require("express");
const downloadVideo = require("../controllers/youtubeController");
const router = express.Router();

router.get("/download", async (req, res) => {
  const { videoUrl } = req.query;
  if (!videoUrl) {
    return res.status(400).json({ error: "You must provide a video URL." });
  }

  res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
  res.setHeader("Content-Type", "video/mp4");

  await downloadVideo(videoUrl, res);
});

module.exports = router;
