import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { errorHandler } from "../middleware/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  // hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  // create a new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  // 1. destructure email and password from req.body
  const { email, password } = req.body;
  try {
    // 2. find the user with the email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "User not found"));
    }
    // 3. compare the password
    const isPasswordValid = bcrypt.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong Credentials"));
    }
    // 4. generate a token
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    // 5. separate the password from the user object
    const { password: pass, ...rest } = validUser.toObject();
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});
