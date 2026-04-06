import Category from "../models/Category.js";

// ✅ Create Category
export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const saved = await category.save();

        res.status(201).json({
            success: true,
            message: "Category created",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error.message
        });
    }
};

// ✅ Get All Categories
export const getCategories = async (req, res) => {
    try {
        const data = await Category.find().sort({ category_order: 1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};

// ✅ Get Single Category
export const getCategoryById = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching category",
            error: error.message
        });
    }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
            error: error.message
        });
    }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error.message
        });
    }
};

export const getCategoriesmenu = async (req, res) => {
  const categories = await Category.find().sort({ category_order: 1 }).orderBy("id","desc");
  res.json(categories);
};