import GalleryImage from "../models/GalleryImage.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

//  Single Storage for both image + video
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        // 👉 IMAGE
        if (file.fieldname === "photo") {
            return {
                folder: "posts/images",
                allowed_formats: ["jpg", "png", "jpeg", "webp"],
                resource_type: "image"
            };
        }

    }
});

//  Multer Upload
export const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});



// Upload / Create Image

export const createImage = async (req, res) => {
    try {

        let body = { ...req.body };

        if (req.files) {
            if (req.files.image_path) {
                body.image_path = req.files.image_path[0].path; // Cloudinary URL
            }
        }
        
        const image = new GalleryImage(body);
        const saved = await image.save();

        res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//  Get All Images
export const getImages = async (req, res) => {
    try {
        const data = await GalleryImage.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching images",
            error: error.message
        });
    }
};

//  Get Images by Post ID
export const getImagesByPost = async (req, res) => {
    try {
        const data = await GalleryImage.findById(req.params.id);

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching post images",
            error: error.message
        });
    }
};

//  Update Image
export const updateImage = async (req, res) => {
    try {
        let body = { ...req.body };

        const baseUrl = req.protocol + "://" + req.get("host");

        // Multiple images
        if (req.files?.image_path) {
            body.image_path = req.files.image_path.map(file => {
                return baseUrl + "/" + file.path.replace(/\\/g, "/");
            });
        }
        const updated = await GalleryImage.findByIdAndUpdate(
            req.params.id,
            body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        res.json({
            success: true,
            message: "Image updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating image",
            error: error.message
        });
    }
};

//  Delete Image
export const deleteImage = async (req, res) => {
    try {
        const deleted = await GalleryImage.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        res.json({
            success: true,
            message: "Image deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting image",
            error: error.message
        });
    }
};

// post ID according gallery image get
export const getImagesPostBYId = async (req, res) => { 
    try {
        const { post_id } = req.params;

        const data = await GalleryImage.find({ post_id: post_id });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching post images",
            error: error.message
        });
    }
};