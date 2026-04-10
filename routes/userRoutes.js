import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);

export default router;