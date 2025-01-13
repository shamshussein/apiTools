const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const convertVideoToAudio = require("../controllers/convertController");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/convert", upload.single("video"), async (req, res) => {
  try {
    console.log(req.file); 
    const videoPath = req.file.path; 
    const outputPath = `uploads/${Date.now()}_output.mp3`;

    const audioPath = await convertVideoToAudio(videoPath, outputPath);
    res.download(audioPath);
  } catch (err) {
    console.error("Error in conversion:", err.message);
    res.status(500).json({ error: "Conversion failed" });
  }
});


module.exports = router;
