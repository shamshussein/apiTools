const express = require("express");
const multer = require("multer");
const mergePDFs = require("../controllers/pdfController");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/merge", upload.array("pdfs", 10), async (req, res) => {
  try {
    const pdfPaths = req.files.map((file) => file.path);
    const mergedPdf = await mergePDFs(pdfPaths);
    const outputPath = `uploads/${Date.now()}_merged.pdf`;
    fs.writeFileSync(outputPath, mergedPdf);
    res.download(outputPath);
  } catch (err) {
    res.status(500).json({ error: "Merging failed" });
  }
});

module.exports = router;
