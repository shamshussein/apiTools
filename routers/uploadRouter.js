const express = require("express");
const multer = require("multer");
const uploadRateLimiter = require("../middlewares/rateLimiterMiddleware");
const uploadFile = require("../controllers/uploadController");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // <10MB
});

const router = express.Router();

router.post(
  "/upload",
  uploadRateLimiter,
  upload.single("file"), 
  uploadFile 
);

module.exports = router;
