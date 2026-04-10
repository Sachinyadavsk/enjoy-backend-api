import GallerySlider from "../models/GallerySlider.js";
import multer from "multer";
import path from "path";

// ✅ Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "photo") {
            cb(null, "uploads/sliders/");
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
    if (file.fieldname === "photo" && !file.mimetype.startsWith("image/")) {
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


export const createSlider = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.photo) {
                body.photo =
                    baseUrl + "/" + req.files.photo[0].path.replace(/\\/g, "/");
            }
        }

        const slider = new GallerySlider(body);
        const saved = await slider.save();
        res.status(201).json({
            success: true,
            message: "Slider created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
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