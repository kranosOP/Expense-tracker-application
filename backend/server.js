require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", UserSchema);

// ✅ JWT Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - Token Missing!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token!" });
    }
};


// ✅ Rename /api/signup to /api/register
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Username already taken!" });
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "✅ User Registered Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
    }
});


// ✅ Login Route
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "❌ Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({
            message: "✅ Login Successful!",
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
    }
});



// ✅ Protected Expenses Route
app.get("/api/expenses", verifyToken, (req, res) => {
    res.json({ message: "✅ Authorized User - Expenses Data Accessed", user: req.user });
});

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("✅ Backend is working fine! 🎯");
});

// Last me middleware add karo
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
  });
  
// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

