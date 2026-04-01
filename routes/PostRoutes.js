import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    getPostBySlug,
    updatePost,
    deletePost
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.get("/post/slug/:slug", getPostBySlug);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;