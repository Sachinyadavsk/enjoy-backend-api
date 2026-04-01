import express from "express";
import {
    createAd,
    getAllAds,
    getAdById,
    updateAd,
    deleteAd
} from "../controllers/AdsController.js";

const router = express.Router();

// CRUD Routes
router.post("/ads", createAd);
router.get("/ads", getAllAds);
router.get("/ads/:id", getAdById);
router.put("/ads/:id", updateAd);
router.delete("/ads/:id", deleteAd);

export default router;