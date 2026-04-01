import express from "express";
import {
    createImage,
    getImages,
    getImagesByPost,
    updateImage,
    deleteImage
} from "../controllers/GalleryImageController.js";

const router = express.Router();

// Routes
router.post("/gallery", createImage);
router.get("/gallery", getImages);
router.get("/gallery/post/:post_id", getImagesByPost);
router.put("/gallery/:id", updateImage);
router.delete("/gallery/:id", deleteImage);

export default router;