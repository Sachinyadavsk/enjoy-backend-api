import GallerySlider from "../models/GallerySlider.js";
import multer from "multer";
import fs from "fs";

// ✅ Create upload folder if not exists
const uploadDir = "uploads/sliders/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

// ✅ Upload middleware
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

// ✅ Create Slider (UPLOAD + URL SUPPORT)
export const createSlider = async (req, res) => {
    try {
        let photoUrl = "";

        // ✅ Case 1: File Upload
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            photoUrl = `${baseUrl}/sliders/${req.file.filename}`;
        }

        // ✅ Case 2: Direct URL
        else if (req.body.photo) {
            photoUrl = req.body.photo;
        }

        // ❌ No image
        else {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const slider = new GallerySlider({
            cate_id: req.body.cate_id,
            uid: req.body.uid,
            url_slider: req.body.url_slider,
            slider_type: req.body.slider_type,
            photo: photoUrl
        });

        const saved = await slider.save();

        res.status(201).json({
            success: true,
            message: "Slider created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating slider",
            error: error.message
        });
    }
};

// ✅ Get All Sliders
export const getSliders = async (req, res) => {
    try {
        const data = await GallerySlider.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching sliders",
            error: error.message
        });
    }
};

// ✅ Get Slider by ID
export const getSliderById = async (req, res) => {
    try {
        const data = await GallerySlider.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching slider",
            error: error.message
        });
    }
};

// ✅ Get Sliders by Category
export const getSlidersByCategory = async (req, res) => {
    try {
        const data = await GallerySlider.find({ cate_id: req.params.cate_id });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching category sliders",
            error: error.message
        });
    }
};

// ✅ Update Slider
export const updateSlider = async (req, res) => {
    try {
        const updated = await GallerySlider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({
            success: true,
            message: "Slider updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating slider",
            error: error.message
        });
    }
};

// ✅ Delete Slider
export const deleteSlider = async (req, res) => {
    try {
        const slider = await GallerySlider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        // ✅ Delete file if stored locally
        if (slider.photo.includes("/sliders/")) {
            const filePath = slider.photo.replace(
                `${req.protocol}://${req.get("host")}/sliders/`,
                "uploads/sliders/"
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await slider.deleteOne();

        res.json({
            success: true,
            message: "Slider deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting slider",
            error: error.message
        });
    }
};