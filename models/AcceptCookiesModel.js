import mongoose from "mongoose";

const AcceptCookiesSchema = new mongoose.Schema({
    ip: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postal: { type: String },
    loc: { type: String },
    isp: { type: String },
    device: { type: String },
    os: { type: String },
    user_agent: { type: String },
    date_time: { type: String }
}, { timestamps: true });

export default mongoose.model("AcceptCookies", AcceptCookiesSchema);