import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    uid: { type: Number, required: true },

    // Better: use ObjectId if linking Category collection
    category_id: { type: Number },

    name: { type: String, trim: true },

    slug: { type: String, unique: true, lowercase: true, trim: true },

    show_on_menu: { type: Boolean, default: false },

    photo: { type: String },
    banner: { type: String },

    created_at: { type: Date, default: Date.now }

}, { timestamps: true });

// Unique index like SQL
SubCategorySchema.index({ slug: 1 }, { unique: true });

// Optional index for filtering
SubCategorySchema.index({ category_id: 1 });

// Auto slug generate
SubCategorySchema.pre("save", function (next) {
    if (this.name && !this.slug) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
    }
    next();
});

export default mongoose.model("SubCategory", SubCategorySchema);