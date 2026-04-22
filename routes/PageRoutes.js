import express from "express";
import {
    createPage,
    getPages,
    getPageById,
    updatePage,
    deletePage,
    upload,
} from "../controllers/PageController.js";

const router = express.Router();

router.post("/pages", upload.none(), createPage);
router.get("/pages", getPages);
router.get("/pages/:id", getPageById);
router.put("/pages/:id", upload.none(), updatePage);
router.delete("/pages/:id", deletePage);

export default router;