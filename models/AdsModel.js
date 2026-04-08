import mongoose from "mongoose";

const AdsSchema = new mongoose.Schema({
    add_placement: { type: String, enum: ['header', 'sidebar', 'footer'], default: 'sidebar' },
    addSize: { type: String, default: null },
    click: { type: Number, required: true },
    banner_image: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model("Ads", AdsSchema);