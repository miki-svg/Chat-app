import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Debug log to check if env vars are loaded
console.log("Cloudinary Config Check:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,      // Changed from API_key to api_key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Changed from API_secret to api_secret
});

export default cloudinary;