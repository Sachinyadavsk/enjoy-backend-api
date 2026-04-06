import express from "express";
import {
    createSlider,
    getSliders,
    getSliderById,
    getSlidersByCategory,
    updateSlider,
    upload,
    deleteSlider
} from "../controllers/GallerySliderController.js";

const router = express.Router();

router.post("/sliders", upload.single("photo"), createSlider);
router.get("/sliders", getSliders);
router.get("/sliders/:id", getSliderById);
router.get("/sliders/category/:cate_id", getSlidersByCategory);
router.put("/sliders/:id", updateSlider);
router.delete("/sliders/:id", deleteSlider);

export default router;