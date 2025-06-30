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

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Endpoints for managing employees
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - department
 *       properties:
 *         _id:
 *           type: string
 *           example: 60a7c0f45c1a3a001c8d1234
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         role:
 *           type: string
 *           enum: [Employee, Manager, Intern]
 *           example: Employee
 *         department:
 *           type: string
 *           example: Engineering
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "Node.js"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-28T12:34:56.789Z
 */


/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Get all employees (Admin only)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized
 */
router.get("/", isAdmin, getAllEmployee);

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a new employee (Admin only)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized
 */
router.post("/", isAdmin, createEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get an employee by ID (Logged in user or Admin)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */


router.get("/", isAdmin, getAllEmployee);
router.post("/", isAdmin, createEmployee);
router.get("/:id", getEmployeeById); // Employees can see only their profile (add check in controller if needed)

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update an employee (Admin only)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", isAdmin, updateEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete an employee (Admin only)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", isAdmin, deleteEmployee);

export default router;
