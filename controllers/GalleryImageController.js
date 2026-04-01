import GalleryImage from "../models/GalleryImage.js";

// ✅ Upload / Create Image
export const createImage = async (req, res) => {
    try {
        const image = new GalleryImage({
            uid: req.body.uid,
            post_id: req.body.post_id,
            image_path: req.body.image_path,
            caption: req.body.caption
        });

        const saved = await image.save();

        res.status(201).json({
            success: true,
            message: "Image added",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding image",
            error: error.message
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