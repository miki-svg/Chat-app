import express from 'express';
import dotenv from 'dotenv';
import {connectDB}  from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables FIRST
dotenv.config();

// Debug: Check if Cloudinary env vars are loaded
console.log("Environment Variables Loaded:");
console.log("PORT:", process.env.PORT);
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "Loaded (hidden)" : "NOT LOADED");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb' 
}));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log('Backend server is running on PORT:' + PORT);
  connectDB();
});