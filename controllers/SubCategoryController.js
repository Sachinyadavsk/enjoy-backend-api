import SubCategory from "../models/SubCategory.js";

// ✅ Create SubCategory
export const createSubCategory = async (req, res) => {
    try {
        const data = new SubCategory(req.body);
        const saved = await data.save();

        res.status(201).json({
            success: true,
            message: "SubCategory created",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating subcategory",
            error: error.message
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