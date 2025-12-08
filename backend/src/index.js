import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./utils/index.js";
import salesRoutes from "./routes/salesRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/sales", salesRoutes);
app.use("/api/meta", metaRoutes);
app.get("/", (req, res) => {
  res.send("TruEstate Retail Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
