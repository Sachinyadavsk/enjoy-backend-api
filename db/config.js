import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve('backend/.env')
});


const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};

export default connectDB;