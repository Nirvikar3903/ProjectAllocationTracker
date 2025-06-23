import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken); // All routes require login

router.get("/", isAdmin, getAllProject);
router.post("/", isAdmin, createProject);
router.get("/:id", getProjectById); // Employees can see only their profile (add check in controller if needed)
router.put("/:id", isAdmin, updateProject);
router.delete("/:id", isAdmin, deleteProject);

export default router;
