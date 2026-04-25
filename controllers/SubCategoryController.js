import SubCategory from "../models/SubCategory.js";

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

        // 👉 VIDEO
        if (file.fieldname === "banner") {
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

//  Create SubCategory API
export const createSubCategory = async (req, res) => {
    try {
        let body = { ...req.body };

        if (req.files) {
            if (req.files.photo) {
                body.photo = req.files.photo[0].path; // Cloudinary URL
            }

            if (req.files.banner) {
                body.banner = req.files.banner[0].path; // Cloudinary URL
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

//  Get All SubCategories
export const getSubCategories = async (req, res) => {
    try {
        let { page = 1, limit = 5, search = "" } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        // 🔍 Search (by name or slug)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { slug: { $regex: search, $options: "i" } }
            ];
        }

        // Total count
        const total = await SubCategory.countDocuments(query);

        // Fetch paginated data
        const subCategories = await SubCategory.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: subCategories,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  Get by Category ID
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

//  Get Single SubCategory
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

//  Update
export const updateSubCategory = async (req, res) => {
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
        const updated = await SubCategory.findByIdAndUpdate(
            req.params.id,
            body,
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

//  Delete
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