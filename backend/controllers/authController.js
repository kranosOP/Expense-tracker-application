const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model is created
const bcrypt = require("bcryptjs"); 


exports.register = async (req, res) => {
    const { username, password } = req.body;
    console.log("📩 Register Request:", req.body);
 
    if (!username || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }
 
    try {
      console.log("🔑 Hashing password...");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("✅ Password hashed!");
 
      const newUser = new User({ username, password: hashedPassword });
      console.log("📝 Saving user...");
      await newUser.save();
 
      console.log("✅ User registered successfully!");
      res.status(201).json({ message: "User registered successfully" });
 
    } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ message: "Error registering user", error });
    }
 };
 


exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// User Logout
exports.logout = (req, res) => {
    res.json({ message: "Logout successful" });
};

