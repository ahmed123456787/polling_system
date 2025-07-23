import { Router } from "express";
import {
  getPolls,
  createPoll,
  getPollById,
  deletePoll,
  updatePoll,
} from "../controllers/pollController.js";
import { protect } from "../controllers/authController.js";

const pollRouter = Router();

pollRouter
  .get("/polls", protect, getPolls)
  .post("/polls", protect, createPoll)
  .get("/polls/:id", protect, getPollById)
  .delete("/polls/:id", protect, deletePoll);

export default pollRouter;
