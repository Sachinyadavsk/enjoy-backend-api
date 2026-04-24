import Post from "../models/Post.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

//  Single Storage for both image + video
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        // 👉 IMAGE
        if (file.fieldname === "image_big") {
            return {
                folder: "posts/images",
                allowed_formats: ["jpg", "png", "jpeg", "webp"],
                resource_type: "image"
            };
        }

        // 👉 VIDEO
        if (file.fieldname === "video_path") {
            return {
                folder: "posts/videos",
                resource_type: "video",
                allowed_formats: ["mp4", "mov", "avi"]
            };
        }
    }
});

//  Multer Upload
export const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

const getPublicId = (url) => {
    try {
        const parts = url.split("/");
        const fileName = parts.pop(); // abc123.jpg
        const folder = parts.slice(parts.indexOf("upload") + 1).join("/");

        const publicId = folder + "/" + fileName.split(".")[0];
        return publicId;
    } catch (err) {
        return null;
    }
};

//  Create Post
export const createPost = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            if (req.files.image_big) {
                body.image_big = req.files.image_big[0].path; // Cloudinary URL
            }

            if (req.files.video_path) {
                body.video_path = req.files.video_path[0].path; // Cloudinary URL
            }
        }

        const post = new Post(body);
        const saved = await post.save();

        res.json({
            success: true,
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  Get All Posts
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

//  Get Single Post
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
            message: error.message
        });
    }
};

//  Get Post by Slug
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
            message: error.message
        });
    }
};

//  Update Post
export const updatePost = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            if (req.files.image_big) {
                body.image_big = req.files.image_big[0].path;
            }

            if (req.files.video_path) {
                body.video_path = req.files.video_path[0].path;
            }
        }

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            body,
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
            message: error.message
        });
    }
};

//  Delete Post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        //  Delete Image
        if (post.image_big) {
            const publicId = getPublicId(post.image_big);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        //  Delete Video
        if (post.video_path) {
            const publicId = getPublicId(post.video_path);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId, {
                    resource_type: "video"
                });
            }
        }

        //  Delete DB record
        await Post.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Post + media deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};