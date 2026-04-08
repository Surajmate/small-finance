const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    console.log(process.env.MONGO_URI); // 👈 DEBUG

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas connected ✅");
    
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;