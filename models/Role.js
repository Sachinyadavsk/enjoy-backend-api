import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: { type: String, trim: true },

    // store permissions as array (better than TEXT)
    permissions: [{ type: String }]

}, { timestamps: true });

// Optional index
RoleSchema.index({ name: 1 });

export default mongoose.model("Role", RoleSchema);