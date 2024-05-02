import asyncHandler from "express-async-handler";
import { errorHandler } from "../middleware/errorHandler.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

export const test = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Api is working fine!",
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    // If password is provided, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // next update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // id of the user to update
      {
        // update the user with the new data
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // required to turn new to true
    );

    // destructure the password from the rest of the user object
    const { password, ...rest } = updatedUser.toObject();
    // return the rest of the user object in the response
    res.status(200).json(rest);
  } catch (error) {
    // if an error occurs, call the next middleware with the error
    next(error);
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  // 1. Check if the user params id is the same as the user id in the request
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  // 2. Find the user and delete it
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token"); // delete the access_token cookie
    // 3. Return a success message
    res.status(200).json("User has been deleted");
  } catch (error) {
    // 4. If an error occurs, call the next middleware with the error
    next(error);
  }
});

export const getUserListing = asyncHandler(async (req, res, next) => {
  // 1. Check if the user params id is the same as the user id in the request
  if (req.user.id === req.params.id) {
    try {
      // 2. Find all listings that belong to the user
      const listings = await Listing.find({ userRef: req.params.id });
      // 3. Return the listings
      res.status(200).json(listings);
    } catch (error) {
      // 4. If an error occurs, call the next middleware with the error
      next(error);
    }
  } else {
    // 5. If the user id does not match the user id in the request, return an error
    return next(errorHandler(401, "You can only view your own listings!"));
  }
});

export const getUser = asyncHandler(async (req, res, next) => {
  try {
    // 1. find the user
    const user = await User.findById(req.params.id);
    // 2. if the user is not found return error
    if (!user) return next(errorHandler(404, "User not found"));
    // 3. destructure user and separate the password from the rest of data
    const { password: pass, ...rest } = user.toObject();
    // 4. send the rest of data
    res.status(200).json(rest);
  } catch (error) {
    // if an error occurs send the error
    next(error);
  }
});
