import mongoose from "mongoose";

const GallerySliderSchema = new mongoose.Schema({
    cate_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    uid: { type: Number, required: true },
    url_slider: { type: String },
    slider_type: { type: String },
    photo: { type: String } // longtext → string
}, {
    timestamps: true // replaces created_at
});



export default mongoose.model("GallerySlider", GallerySliderSchema);