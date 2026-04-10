import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    getPostBySlug,
    updatePost,
    deletePost,
    upload
} from "../controllers/PostController.js";


const router = express.Router();


router.post("/posts", (req, res, next) => {

    upload.fields([
        { name: "image_big", maxCount: 1 },
        { name: "video_path", maxCount: 1 }
    ])(req, res, function (err) {

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        next();
    });

}, createPost);

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.get("/post/slug/:slug", getPostBySlug);
router.put("/posts/:id", upload.fields([
    { name: "image_big", maxCount: 1 },
    { name: "video_path", maxCount: 1 }
]), updatePost);
router.delete("/posts/:id", deletePost);

export default router;