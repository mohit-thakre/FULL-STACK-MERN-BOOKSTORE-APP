const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/signup", async (req, res) => {
  const { username, email, password, confirmpassword, address } = req.body;

  try {
    // Validate username length
    if (username.length < 3 || username.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 15 characters",
      });
    }

    // Validate password length
    if (password.length < 8 || password.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 15 characters",
      });
    }

    // Confirm password
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if username already exists
    let existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Check if email already exists
    let existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      username: username,
      password: hashedpassword,
      confirmpassword: hashedpassword,
      email: email,
      address: address,
    });
    await newuser.save();
    return res
      .status(200)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist. Please sign up before logging in.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    const payload = {
      name: existingUser.username,
      role: existingUser.role,
    };

    if (passwordMatch) {
      const token = jwt.sign(payload, "mohit", { expiresIn: "5h" });
      return res
        .status(200)
        .json({ id: existingUser._id, role: existingUser.role, token: token });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. User login failed.",
      });
    }
  } catch (error) {
    console.error("Error at login:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login." });
  }
});

router.get("/getuser", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id);
    return res.status(200).json({ success: data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error at get user" });
  }
});
router.put("/updateaddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { address: address },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Address updated successfully.",
    });
  } catch (error) {
    console.error("Error at update:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during update." });
  }
});

module.exports = router;
