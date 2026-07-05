import express from "express";
import {
  deleteReport,
  getReportById,
  getReports,
} from "../controllers/reportController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getReports);
router.get("/:id", protect, getReportById);
router.delete("/:id", protect, deleteReport);

export default router;