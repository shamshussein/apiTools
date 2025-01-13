const rateLimit = require("express-rate-limit");

const uploadRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, 
  message: {
    error: "Too many file uploads from this IP, please try again later.",
  },
});

module.exports = uploadRateLimiter;
