import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Selam Abay",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },

  {
    email: "sophia.davis@example.com",
    fullName: "Seliyana Dawit",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ekram  Salman",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },

  {
    email: "mia.johnson@example.com",
    fullName: "Maya Haymanot",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  
 

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "Hamza Jemal",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  
  {
    email: "benjamin.taylor@example.com",
    fullName: "Biniyam Abebe",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Abebe",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();