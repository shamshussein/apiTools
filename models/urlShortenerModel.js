const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, default: shortid.generate },
});

module.exports = mongoose.model("Url", urlSchema);
