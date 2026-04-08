import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema({
    uid: { type: Number },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    image_path: { type: String },
    caption: { type: String, trim: true }
}, {
    timestamps: true // handles createdAt & updatedAt
});


export default mongoose.model("GalleryImage", GalleryImageSchema);