import express from "express";
import { getAllTags } from "../controllers/metaController.js";

const router = express.Router();
router.get("/tags", getAllTags);
export default router;
