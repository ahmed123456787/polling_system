import { getResponses } from "../controllers/responseController.js";
import { Router } from "express";
import { protect } from "../controllers/authController.js";

const responseRouter = Router();

responseRouter.get("/responses", protect, getResponses);

export default responseRouter;
