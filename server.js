import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});