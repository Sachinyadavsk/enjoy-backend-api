import mongoose from "mongoose";

const GallerySliderSchema = new mongoose.Schema({
    cate_id: { type: Number }, // or ObjectId if linking categories
    uid: { type: Number, required: true },
    url_slider: { type: String },
    slider_type: { type: String },
    photo: { type: String } // longtext → string
}, {
    timestamps: true // replaces created_at
});

// Optional index
GallerySliderSchema.index({ cate_id: 1 });

export default mongoose.model("GallerySlider", GallerySliderSchema);