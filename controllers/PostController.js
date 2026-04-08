import Post from "../models/Post.js";
import multer from "multer";
import path from "path";

// ✅ Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video_path") {
            cb(null, "uploads/video/");
        } else if (file.fieldname === "image_big") {
            cb(null, "uploads/postimage/");
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "-" + file.fieldname + ext;
        cb(null, name);
    }
});

// ✅ File Filter
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "video_path" && !file.mimetype.startsWith("video/")) {
        return cb(new Error("Only video allowed"), false);
    }
    if (file.fieldname === "image_big" && !file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image allowed"), false);
    }
    cb(null, true);
};

// ✅ Multer Upload
export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter
});

// ✅ Create Post API
export const createPost = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.image_big) {
                body.image_big =
                    baseUrl + "/" + req.files.image_big[0].path.replace(/\\/g, "/");
            }

            if (req.files.video_path) {
                body.video_path =
                    baseUrl + "/" + req.files.video_path[0].path.replace(/\\/g, "/");
            }
        }

        const post = new Post(body);
        const saved = await post.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get All Posts (with pagination)
export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const data = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Post.countDocuments();

        res.json({
            success: true,
            page,
            total,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching posts",
            error: error.message
        });
    }
};

// ✅ Get Single Post
export const getPostById = async (req, res) => {
    try {
        const data = await Post.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching post",
            error: error.message
        });
    }
};

// ✅ Get Post by Slug (Frontend)
export const getPostBySlug = async (req, res) => {
    try {
        const data = await Post.findOne({ slug: req.params.slug });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching post",
            error: error.message
        });
    }
};

// ✅ Update Post
export const updatePost = async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.json({
            success: true,
            message: "Post updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message
        });
    }
};

// ✅ Delete Post
export const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.json({
            success: true,
            message: "Post deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message
        });
    }
};