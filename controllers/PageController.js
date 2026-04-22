import Page from "../models/Page.js";
import multer from "multer";
const storage = multer.memoryStorage(); // or diskStorage if needed
export const upload = multer({ storage });

// 🔹 Helper: Generate slug
const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ✅ Create Page
export const createPage = async (req, res) => {
    try {
        let { language_id, uid, title, slug, content, placement, status, wbsite_right_column } = req.body;
        // ✅ Validation
        if (!language_id || !uid || !title || !content) {
            return res.status(400).json({
                success: false,
                message: "language_id, uid, title, content are required"
            });
        }

        // ✅ Auto slug
        slug = slug ? generateSlug(slug) : generateSlug(title);

        const page = new Page({
            language_id,
            uid,
            title,
            slug,
            content,
            placement,
            status,
            wbsite_right_column
        });

        const saved = await page.save();

        res.status(201).json({
            success: true,
            message: "Page created successfully",
            data: saved
        });

    } catch (error) {

        // Duplicate slug
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error creating page",
            error: error.message
        });
    }
};

// ✅ Get All Pages
export const getPages = async (req, res) => {
    try {
        const pages = await Page.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: pages.length,
            data: pages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching pages",
            error: error.message
        });
    }
};

// ✅ Get Single Page
export const getPageById = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            data: page
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching page",
            error: error.message
        });
    }
};

// ✅ Update Page
export const updatePage = async (req, res) => {
    try {
        let { title, slug } = req.body;

        if (slug) {
            slug = generateSlug(slug);
            req.body.slug = slug;
        } else if (title) {
            req.body.slug = generateSlug(title);
        }

        const updated = await Page.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Page updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating page",
            error: error.message
        });
    }
};

// ✅ Delete Page
export const deletePage = async (req, res) => {
    try {
        const deleted = await Page.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Page deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting page",
            error: error.message
        });
    }
};