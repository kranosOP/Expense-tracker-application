const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },  // ✅ Add this line
    password: { type: String, required: true }
});


// Hash password before saving
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    console.log("Hashing password for:", this.email); // Debugging ke liye
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed successfully!");
    next();
  } catch (error) {
    console.error("Error in password hashing:", error);
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
