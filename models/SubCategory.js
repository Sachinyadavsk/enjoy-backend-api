import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    uid: { type: Number, required: true },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: { type: String, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    show_on_menu: { type: Boolean, default: false },
    photo: { type: String },
    banner: { type: String },
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });


export default mongoose.model("SubCategory", SubCategorySchema);