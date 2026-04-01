import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema({
    uid: { type: Number },
    post_id: { type: Number }, // can also use ObjectId if linking posts collection
    image_path: { type: String },
    caption: { type: String, trim: true }
}, {
    timestamps: true // handles createdAt & updatedAt
});

// Optional index (faster queries)
GalleryImageSchema.index({ post_id: 1 });

export default mongoose.model("GalleryImage", GalleryImageSchema);