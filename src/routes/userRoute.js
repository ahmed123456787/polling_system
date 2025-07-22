import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

const userRouter = Router();

userRouter.post("/login", login);

userRouter
  .get("/users", getUsers)
  .get("/users/:id", getUserById)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

export default userRouter;
