import express from "express";
import {
    createSubCategory,
    getSubCategories,
    getByCategory,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    upload
} from "../controllers/SubCategoryController.js";

const router = express.Router();

router.post("/subcategories", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
]), createSubCategory);

router.get("/subcategories", getSubCategories);
router.get("/subcategories/category/:category_id", getByCategory);
router.get("/subcategories/:id", getSubCategoryById);
router.put("/subcategories/:id", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
]), updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;