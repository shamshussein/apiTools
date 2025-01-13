const express = require("express");
const generatePassword = require("../controllers/passwordController");
const router = express.Router();


router.get("/generate", (req, res) => {
  const length = parseInt(req.query.length, 10) || 12; 

  if (length <= 0 || length > 128) { 
    return res.status(400).json({ error: "Password length must be between 1 and 128." });
  }

  const password = generatePassword(length);
  res.json({ password });
});

module.exports = router;
