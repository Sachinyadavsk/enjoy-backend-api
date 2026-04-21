import express from "express";
import {
    createAd,
    getAllAds,
    getAdById,
    updateAd,
    deleteAd,
    upload
} from "../controllers/AdsController.js";

const router = express.Router();

// CRUD Routes
router.post("/ads", upload.fields([
    { name: "banner_image", maxCount: 1 }
]), createAd);
router.get("/ads", getAllAds);
router.get("/ads/:id", getAdById);
router.put("/ads/:id", upload.fields([
    { name: "banner_image", maxCount: 1 }
]), updateAd);
router.delete("/ads/:id", deleteAd);

export default router;