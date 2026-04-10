import express from "express";
import {
    createSlider,
    getSliders,
    getSliderById,
    getSlidersByCategory,
    updateSlider,
    deleteSlider
} from "../controllers/GallerySliderController.js";
import { upload } from "../controllers/sliderController.js";

const router = express.Router();

router.post("/sliders", upload.fields([{ name: "photo", maxCount: 1 }]), createSlider);
router.get("/sliders", getSliders);
router.get("/sliders/:id", getSliderById);
router.get("/sliders/category/:cate_id", getSlidersByCategory);
router.put("/sliders/:id", upload.fields([{ name: "photo", maxCount: 1 }]), updateSlider);
router.delete("/sliders/:id", deleteSlider);

export default router;


