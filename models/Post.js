import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    uid: { type: Number, required: true },

    post_type: {
        type: String,
        enum: ['article', 'audio', 'video', 'list'],
        required: true
    },

    title: { type: String, required: true, trim: true },

    prices: { type: Number },
    discount_price: { type: Number },

    slug: { type: String, required: true, lowercase: true, trim: true },

    meta_desc: { type: String },
    description: { type: String },

    image_big: { type: String },

    video_path: { type: String },
    embed_code: { type: String },

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategories_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },

    is_slider: { type: Boolean, default: false },
    schedule_post: { type: Boolean, default: false },
    schedule_post_date: { type: Date },

    status: {
        type: String,
        enum: ['published', 'draft', 'pending'],
        required: true
    },

    is_popular: { type: Boolean, default: false },
    is_deals_under: { type: Boolean, default: false }

}, { timestamps: true });

//  Unique compound index (like SQL)
PostSchema.index(
    { slug: 1, category_id: 1, subcategories_id: 1 },
    { unique: true }
);

//  Auto slug generate
PostSchema.pre("save", function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
    }
});

export default mongoose.model("Post", PostSchema);