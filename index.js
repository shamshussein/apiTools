const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const youtubeRoutes = require("./routers/youtubeRouter");
const converterRoutes = require("./routers/converterRouter");
const pdfRoutes = require("./routers/pdfRouter");
const passwordRoutes = require("./routers/passwordRouter");
const uploadRouter = require("./routers/uploadRouter");
const cors = require("cors");

const DB = require("./database").connectDB;

DB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", uploadRouter);
app.use("/youtube", youtubeRoutes);
app.use("/", converterRoutes);
app.use("/pdf", pdfRoutes);
app.use("/password", passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
