import Page from "../models/Page.js";

// ✅ Create Page
export const createPage = async (req, res) => {
    try {
        const page = new Page(req.body);
        const saved = await page.save();

        res.status(201).json({
            success: true,
            message: "Page created",
            data: saved
        });

    } catch (error) {
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
        const data = await Page.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching pages",
            error: error.message
        });
    }
};

// ✅ Get Single Page (by ID)
export const getPageById = async (req, res) => {
    try {
        const data = await Page.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching page",
            error: error.message
        });
    }
};

// ✅ Get Page by Slug (Important for frontend)
export const getPageBySlug = async (req, res) => {
    try {
        const data = await Page.findOne({ slug: req.params.slug });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.json({
            success: true,
            data
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
        const updated = await Page.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.json({
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

        res.json({
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