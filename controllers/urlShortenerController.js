const Url = require("../models/urlShortenerModel");

const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (!url) {
      url = await Url.create({ originalUrl });
    }
    res.status(201).json({ originalUrl: url.originalUrl, shortUrl: `${req.headers.host}/${url.shortId}` });
  } catch (err) {
    console.error("Error creating short URL:", err.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: "Short URL not found." });
    }
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error redirecting URL:", err.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
