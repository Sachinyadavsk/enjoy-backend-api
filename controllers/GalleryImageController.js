import GalleryImage from "../models/GalleryImage.js";
import multer from "multer";
import path from "path";

// ✅ Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image_path") {
            cb(null, "uploads/image_path/");
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
    if (file.fieldname === "image_path" && !file.mimetype.startsWith("image/")) {
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

// Upload / Create Image


export const createImage = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.image_path) {
                body.image_path =
                    baseUrl + "/" + req.files.image_path[0].path.replace(/\\/g, "/");
            }
        }

        const image = new GalleryImage(body);
        const saved = await image.save();
        res.status(201).json({
            success: true,
            message: "Image created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ Get All Images
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

// ✅ Get Images by Post ID
export const getImagesByPost = async (req, res) => {
    try {
        const data = await GalleryImage.find({ post_id: req.params.post_id });

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

// ✅ Update Image
export const updateImage = async (req, res) => {
    try {
        const updated = await GalleryImage.findByIdAndUpdate(
            req.params.id,
            req.body,
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

// ✅ Delete Image
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