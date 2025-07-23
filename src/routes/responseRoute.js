import {
  getResponses,
  createResponse,
} from "../controllers/responseController.js";
import { Router } from "express";
import { protect } from "../controllers/authController.js";

const responseRouter = Router();

responseRouter
  .get("/responses", protect, getResponses)
  .post("/responses", protect, createResponse);

export default responseRouter;
