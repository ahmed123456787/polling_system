import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

/*----------------------------------------------------------- */

export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({ status: "success", data: user });
});

/*----------------------------------------------------------- */

export const createUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ status: "success", data: newUser });
});

/*----------------------------------------------------------- */

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, password },
    { new: true }
  );

  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: updatedUser });
});

/*----------------------------------------------------------- */

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});

export default { getUsers, createUser, updateUser, deleteUser };
