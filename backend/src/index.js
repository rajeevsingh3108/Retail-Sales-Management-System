import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./utils/index.js";
import salesRoutes from "./routes/salesRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://retail-sales-management-system-sigma.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

app.use(express.json());

connectDB();

app.use("/api/sales", salesRoutes);
app.use("/api/meta", metaRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Retail Backend Running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
