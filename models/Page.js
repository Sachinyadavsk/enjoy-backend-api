import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    language_id: { type: String, maxlength: 5 },
    uid: { type: Number, required: true },
    title: { type: String, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    content: { type: String },
    placement: { type: String },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    wbsite_right_column: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

// Unique index (like SQL UNIQUE)
PageSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model("Page", PageSchema);