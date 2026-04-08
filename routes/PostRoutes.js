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

router.post(
    "/posts",
    upload.fields([
        { name: "image_big", maxCount: 1 },
        { name: "video_path", maxCount: 1 }
    ]),
    createPost
);

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.get("/post/slug/:slug", getPostBySlug);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;