import express from "express";
import {
  createIdea,
  getIdeaById,
  getIdeas,
} from "../controllers/ideaController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createIdea);
router.get("/", protect, getIdeas);
router.get("/:id", protect, getIdeaById);

export default router;