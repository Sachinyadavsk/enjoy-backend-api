import GallerySlider from "../models/GallerySlider.js";
import fs from "fs";
import multer from "multer";
import path from "path";

const uploadDir = "uploads/sliders";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/sliders/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter
});


// ✅ CREATE
export const createSlider = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files?.photo) {
            const baseUrl = req.protocol + "://" + req.get("host");

            body.photo =
                baseUrl +
                "/uploads/sliders/" +
                req.files.photo[0].filename;
        }

        const slider = new GallerySlider(body);
        const saved = await slider.save();

        res.status(201).json({
            success: true,
            message: "Slider created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET ALL
export const getSliders = async (req, res) => {
    try {
        const data = await GallerySlider.find().sort({ createdAt: -1 });

        res.json({ success: true, data });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching sliders",
            error: error.message
        });
    }
};

// ✅ GET BY ID
export const getSliderById = async (req, res) => {
    try {
        const data = await GallerySlider.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({ success: true, data });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching slider",
            error: error.message
        });
    }
};

// ✅ GET BY CATEGORY
export const getSlidersByCategory = async (req, res) => {
    try {
        const data = await GallerySlider.find({
            cate_id: req.params.cate_id
        });

        res.json({ success: true, data });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching category sliders",
            error: error.message
        });
    }
};

// ✅ UPDATE (WITH OLD IMAGE DELETE)
export const updateSlider = async (req, res) => {
    try {
        const slider = await GallerySlider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        let body = { ...req.body };

        if (req.files?.photo) {
            const baseUrl = req.protocol + "://" + req.get("host");

            // ✅ delete old image
            if (slider.photo) {
                const oldPath = path.join(
                    process.cwd(),
                    slider.photo.replace(/^.*\/uploads/, "uploads")
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            body.photo =
                baseUrl +
                "/uploads/sliders/" +
                req.files.photo[0].filename;
        }

        const updated = await GallerySlider.findByIdAndUpdate(
            req.params.id,
            body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Slider updated successfully",
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

// ✅ DELETE (FINAL FIXED)
export const deleteSlider = async (req, res) => {
    try {
        const slider = await GallerySlider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        if (slider.photo) {
            const filePath = path.join(
                process.cwd(),
                slider.photo.replace(/^.*\/uploads/, "uploads")
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await slider.deleteOne();

        res.json({
            success: true,
            message: "Slider deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting slider",
            error: error.message
        });
    }
};