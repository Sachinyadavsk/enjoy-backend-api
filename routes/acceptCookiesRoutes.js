import express from "express";
const router = express.Router();
import * as controller from "../controllers/AcceptCookiesController.js"

router.post('/accept-cookies', controller.create);
router.get('/accept-cookies', controller.getAll);

export default router;