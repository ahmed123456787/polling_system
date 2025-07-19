import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter
  .get("/users", getUsers)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

export default userRouter;
