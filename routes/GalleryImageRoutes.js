import express from "express";
import {
    createImage,
    getImages,
    getImagesByPost,
    updateImage,
    deleteImage,
    upload,
    getImagesPostBYId
} from "../controllers/GalleryImageController.js";

const router = express.Router();

// Routes
router.post("/gallery", upload.fields([
    { name: "image_path", maxCount: 10 }
]), createImage);
router.get("/gallery", getImages);
router.get("/gallery/post/:id", getImagesByPost);
router.get("/gallery/images/:post_id", getImagesPostBYId);
router.put("/gallery/:id", upload.fields([
    { name: "image_path", maxCount: 10 }
]), updateImage);
router.delete("/gallery/:id", deleteImage);

export default router;