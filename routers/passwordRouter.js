const express = require("express");
const generatePassword = require("../controllers/passwordController");
const router = express.Router();

router.get("/generate", (req, res) => {
  const { length } = req.query;
  const password = generatePassword(Number(length) || 12);
  res.json({ password });
});

module.exports = router;


