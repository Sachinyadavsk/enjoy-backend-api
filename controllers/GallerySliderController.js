import GallerySlider from "../models/GallerySlider.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ✅ Single Storage for both image + video
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

// ✅ Multer Upload
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

export const createSlider = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            if (req.files.photo) {
                body.photo = req.files.photo[0].path;
            }
        }

        const slider = new GallerySlider(body);
        const saved = await slider.save();
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

        // ✅ Delete Image
        if (slider.photo) {
            const publicId = getPublicId(slider.photo);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // ✅ Delete DB record
        await GallerySlider.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Slider + media deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
