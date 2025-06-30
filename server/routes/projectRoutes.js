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

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Endpoints for managing projects
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f8fbb3a0e6f9c3b0d6b2e9
 *         name:
 *           type: string
 *           example: AI Dashboard
 *         description:
 *           type: string
 *           example: A project to build an AI-powered admin panel.
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2024-12-31
 *         status:
 *           type: string
 *           enum: [Not Started, In Progress, On Hold, Completed, Cancelled]
 *           example: In Progress
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           example: High
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-28T10:00:00.000Z
 */

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 */
router.get("/", isAdmin, getAllProject);

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 */
router.post("/", isAdmin, createProject);

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
router.get("/:id", getProjectById); // Employees can see only their profile (add check in controller if needed)

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update project by ID (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
router.put("/:id", isAdmin, updateProject);

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete project by ID (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete("/:id", isAdmin, deleteProject);

export default router;
