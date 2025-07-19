import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

export const createUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ status: "success", data: newUser });
});

export const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, password },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ status: "success", data: updatedUser });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});

export default { getUsers, createUser, updateUser, deleteUser };
