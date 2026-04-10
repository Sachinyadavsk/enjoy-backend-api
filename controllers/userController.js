import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey", {
            expiresIn: "7d",
        });

        res.json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ge all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete user by id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {

    }
}

// update user by id 
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        // Hash new password if provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await user.save();
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}