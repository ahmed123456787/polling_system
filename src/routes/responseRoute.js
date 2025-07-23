import {
  getResponses,
  createResponse,
  getResponseById,
  updateResponse,
  deleteResponse,
} from "../controllers/responseController.js";
import { Router } from "express";
import { protect } from "../controllers/authController.js";

const responseRouter = Router();

responseRouter
  .get("/polls/:pollId/responses", protect, getResponses)
  .post("/polls/:pollId/responses", protect, createResponse)
  .get("/polls/:pollId/responses/:id", protect, getResponseById)
  .patch("/polls/:pollId/responses/:id", protect, updateResponse)
  .delete("/polls/:pollId/responses/:id", protect, deleteResponse);

export default responseRouter;
