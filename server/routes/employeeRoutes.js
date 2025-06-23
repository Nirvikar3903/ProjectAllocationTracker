import express from "express";
import {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken); // All routes require login

router.get("/", isAdmin, getAllEmployee);
router.post("/", isAdmin, createEmployee);
router.get("/:id", getEmployeeById); // Employees can see only their profile (add check in controller if needed)
router.put("/:id", isAdmin, updateEmployee);
router.delete("/:id", isAdmin, deleteEmployee);

export default router;
