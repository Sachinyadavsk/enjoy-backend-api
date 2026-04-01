import express from "express";
import {
    createPage,
    getPages,
    getPageById,
    getPageBySlug,
    updatePage,
    deletePage
} from "../controllers/PageController.js";

const router = express.Router();

router.post("/pages", createPage);
router.get("/pages", getPages);
router.get("/pages/:id", getPageById);
router.get("/page/slug/:slug", getPageBySlug); // frontend friendly
router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

export default router;