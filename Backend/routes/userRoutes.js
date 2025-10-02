import express from "express";
import userModels from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await userModels.findOne({ email });

    if (existUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await userModels.create({
      username: username,
      email: email,
      password: hash,
    });

    res.json({ success: true, message: "Signup Succesfull", user });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModels.findOne({ email });

    if (!existUser) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      secret_key
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Login Succesfull",
        user: existUser || {},
        token,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
