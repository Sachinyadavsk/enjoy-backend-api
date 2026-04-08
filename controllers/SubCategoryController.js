import SubCategory from "../models/SubCategory.js";

import multer from "multer";
import path from "path";

// ✅ Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "photo") {
            cb(null, "uploads/photo/");
        } else if (file.fieldname === "banner") {
            cb(null, "uploads/banner/");
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
    if (file.fieldname === "banner" && !file.mimetype.startsWith("image/")) {
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

// ✅ Create SubCategory API
export const createSubCategory = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            const baseUrl = req.protocol + "://" + req.get("host");

            if (req.files.photo) {
                body.photo =
                    baseUrl + "/" + req.files.photo[0].path.replace(/\\/g, "/");
            }

            if (req.files.banner) {
                body.banner =
                    baseUrl + "/" + req.files.banner[0].path.replace(/\\/g, "/");
            }
        }

        const subcategory = new SubCategory(body);
        const saved = await subcategory.save();

        res.status(201).json({
            success: true,
            message: "SubCategory created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get All SubCategories
export const getSubCategories = async (req, res) => {
    try {
        const data = await SubCategory.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategories",
            error: error.message
        });
    }
};

// ✅ Get by Category ID
export const getByCategory = async (req, res) => {
    try {
        const data = await SubCategory.find({ category_id: req.params.category_id });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategories",
            error: error.message
        });
    }
};

// ✅ Get Single SubCategory
export const getSubCategoryById = async (req, res) => {
    try {
        const data = await SubCategory.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategory",
            error: error.message
        });
    }
};

// ✅ Update
export const updateSubCategory = async (req, res) => {
    try {
        const updated = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            message: "SubCategory updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating subcategory",
            error: error.message
        });
    }
};

// ✅ Delete
export const deleteSubCategory = async (req, res) => {
    try {
        const deleted = await SubCategory.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            message: "SubCategory deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting subcategory",
            error: error.message
        });
    }
};