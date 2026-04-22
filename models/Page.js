import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    language_id: {
        type: String,
        maxlength: 5,
        required: true
    },
    uid: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    placement: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    wbsite_right_column: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

PageSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model("Page", PageSchema);