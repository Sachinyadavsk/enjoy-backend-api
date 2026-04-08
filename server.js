import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import userRoutes from "./routes/userRoutes.js";
import acceptCookiesRoutes from "./routes/acceptCookiesRoutes.js";
import adsRoutes from "./routes/AdsRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import galleryRoutes from "./routes/GalleryImageRoutes.js";
import sliderRoutes from "./routes/GallerySliderRoutes.js";
import pageRoutes from "./routes/PageRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import roleRoutes from "./routes/RoleRoutes.js";
import subCategoryRoutes from "./routes/SubCategoryRoutes.js";
import homeRoutes from "./routes/homeValueRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// serve uploaded images
app.use("/sliders", express.static("uploads/sliders"));
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/users", userRoutes);

app.use('/api', acceptCookiesRoutes);
app.use("/api", adsRoutes);
app.use("/api", categoryRoutes);
app.use("/api", galleryRoutes);
app.use("/api", sliderRoutes);
app.use("/api", pageRoutes);
app.use("/api", postRoutes);
app.use("/api", roleRoutes);
app.use("/api", subCategoryRoutes);
app.use("/api", homeRoutes);

app.get('/setnao', (req, res) => {
  res.send('Hello Worlds')
})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});