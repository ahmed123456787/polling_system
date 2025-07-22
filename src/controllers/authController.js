import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/User.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const protect = catchAsync(async (req, res, next) => {
  // Get token from headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token, return error
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find user by ID
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Create cookie options
  const cookieOptions = {
    Expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // In production, set secure flag to true (only sent on HTTPS)
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Send token as cookie
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
  });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check the password and email existence
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // find the user
  const user = await User.findOne({ email }).select("+password");

  // check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});
