import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    language_id: { type: String, maxlength: 7 },
    uid: { type: Number, required: true },
    name: { type: String, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    color: { type: String },
    category_order: { type: Number, required: true },
    show_at_homepage: { type: Boolean, default: false },
    show_on_menu: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

// Index (like SQL UNIQUE)
CategorySchema.index({ slug: 1 }, { unique: true });

export default mongoose.model("Category", CategorySchema);