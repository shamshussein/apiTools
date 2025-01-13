const fs = require("fs");
const path = require("path");

const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // const filePath = path.resolve(req.file.path);

    res.status(200).json({
      message: "File uploaded successfully!",
      file: {
        originalName: req.file.originalname,
        size: req.file.size,
        // path: filePath,
      },
    });
  } catch (err) {
    console.error("Error uploading file:", err.message);
    res.status(500).json({ error: "File upload failed." });
  }
};

module.exports = uploadFile;
