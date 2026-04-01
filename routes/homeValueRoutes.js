import express from "express";
import { getHomeData } from "../controllers/homeController.js";

const router = express.Router();

// ✅ MUST be "/"
router.get("/home", getHomeData);

export default router;