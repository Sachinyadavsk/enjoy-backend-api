import express from "express";
import {
    createSlider,
    getSliders,
    getSliderById,
    getSlidersByCategory,
    updateSlider,
    deleteSlider
} from "../controllers/GallerySliderController.js";
import { upload } from "../controllers/GallerySliderController.js";

const router = express.Router();

router.post("/sliders", (req, res, next) => {
    upload.fields([
        { name: "photo", maxCount: 1 }
    ])(req, res, function (err) {

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        next();
    });

}, createSlider);
router.get("/sliders", getSliders);
router.get("/sliders/:id", getSliderById);
router.get("/sliders/category/:cate_id", getSlidersByCategory);
router.put("/sliders/:id", upload.fields([
    { name: "photo", maxCount: 1 }
]), updateSlider);
router.delete("/sliders/:id", deleteSlider);

export default router;


