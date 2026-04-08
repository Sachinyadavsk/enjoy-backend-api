import express from "express";
import {
    createImage,
    getImages,
    getImagesByPost,
    updateImage,
    deleteImage,
    upload
} from "../controllers/GalleryImageController.js";

const router = express.Router();

// Routes
router.post("/gallery", upload.fields([
    { name: "image_path", maxCount: 1 }
]), createImage);
router.get("/gallery", getImages);
router.get("/gallery/post/:post_id", getImagesByPost);
router.put("/gallery/:id", updateImage);
router.delete("/gallery/:id", deleteImage);

export default router;