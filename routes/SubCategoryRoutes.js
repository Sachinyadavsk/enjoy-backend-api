import express from "express";
import {
    createSubCategory,
    getSubCategories,
    getByCategory,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
} from "../controllers/SubCategoryController.js";

const router = express.Router();

router.post("/subcategories", createSubCategory);
router.get("/subcategories", getSubCategories);
router.get("/subcategories/category/:category_id", getByCategory);
router.get("/subcategories/:id", getSubCategoryById);
router.put("/subcategories/:id", updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;