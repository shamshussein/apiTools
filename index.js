const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const youtubeRoutes = require("./routers/youtubeRouter");
const converterRoutes = require("./routers/converterRouter");
const pdfRoutes = require("./routers/pdfRouter");
const passwordRoutes = require("./routers/passwordRouter");
const uploadRouter = require("./routers/uploadRouter");
const urlRouter = require("./routers/urlShortenerRouter");

const cors = require("cors");

const DB = require("./database").connectDB;

DB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }));

app.use("/url", urlRouter);
app.use("/", uploadRouter);
app.use("/youtube", youtubeRoutes);
app.use("/", converterRoutes);
app.use("/pdf", pdfRoutes);
app.use("/password", passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
