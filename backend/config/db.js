require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Atlas Connected");
};

module.exports = connectDB;
