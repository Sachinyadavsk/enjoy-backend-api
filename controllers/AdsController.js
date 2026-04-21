import Ads from "../models/AdsModel.js";
import multer from "multer";
import path from "path";

// ✅ Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "banner_image") {
            cb(null, "uploads/banner_image/");
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
    if (file.fieldname === "banner_image" && !file.mimetype.startsWith("image/")) {
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

// ✅ Create Ad


export const createAd = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.banner_image) {
                body.banner_image =
                    baseUrl + "/" + req.files.banner_image[0].path.replace(/\\/g, "/");
            }
        }

        const ad = new Ads(body);
        const saved = await ad.save();
        res.status(201).json({
            success: true,
            message: "Ads created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get All Ads
export const getAllAds = async (req, res) => {
    try {
        const data = await Ads.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ads",
            error: error.message
        });
    }
};

// ✅ Get Single Ad
export const getAdById = async (req, res) => {
    try {
        const ad = await Ads.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            data: ad
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ad",
            error: error.message
        });
    }
};

// ✅ Update Ad
export const updateAd = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.banner_image) {
                body.banner_image =
                    baseUrl + "/" + req.files.banner_image[0].path.replace(/\\/g, "/");
            }
        }
        const updatedAd = await Ads.findByIdAndUpdate(
            req.params.id,
            body,
            { new: true }
        );

        if (!updatedAd) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            message: "Ad updated successfully",
            data: updatedAd
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating ad",
            error: error.message
        });
    }
};

// ✅ Delete Ad
export const deleteAd = async (req, res) => {
    try {
        const deletedAd = await Ads.findByIdAndDelete(req.params.id);

        if (!deletedAd) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            message: "Ad deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting ad",
            error: error.message
        });
    }
};