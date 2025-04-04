require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User Schema
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String
}));

// ❌ Vulnerable Login Route (NoSQL Injection Possible)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    res.send("✅ Login Successful!");
  } else {
    res.send("❌ Invalid Credentials");
  }
});

// Start Server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
