import Role from "../models/Role.js";

// ✅ Create Role
export const createRole = async (req, res) => {
    try {
        const role = new Role(req.body);
        const saved = await role.save();

        res.status(201).json({
            success: true,
            message: "Role created",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating role",
            error: error.message
        });
    }
};

// ✅ Get All Roles
export const getRoles = async (req, res) => {
    try {
        const data = await Role.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching roles",
            error: error.message
        });
    }
};

// ✅ Get Role by ID
export const getRoleById = async (req, res) => {
    try {
        const data = await Role.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching role",
            error: error.message
        });
    }
};

// ✅ Update Role
export const updateRole = async (req, res) => {
    try {
        const updated = await Role.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.json({
            success: true,
            message: "Role updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating role",
            error: error.message
        });
    }
};

// ✅ Delete Role
export const deleteRole = async (req, res) => {
    try {
        const deleted = await Role.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.json({
            success: true,
            message: "Role deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting role",
            error: error.message
        });
    }
};