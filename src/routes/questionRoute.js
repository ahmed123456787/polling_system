import { Router } from "express";
import {
  getQuestions,
  createQuestion,
  
} from "../controllers/questionController.js";
import { protect } from "../controllers/authController.js";

const questionRouter = Router();
questionRouter
  .get("/polls/:pollId/questions", protect, getQuestions)
  .post("/polls/:pollId/questions", protect, createQuestion);

export default questionRouter;
