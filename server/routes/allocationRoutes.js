import express from 'express';
import {
  createAllocation,
  getAllAllocation,
  getAllocationById,
  updateAllocation,
  deleteAllocation
} from '../controllers/allocationController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // All routes are protected

/**
 * @swagger
 * tags:
 *   name: Allocation
 *   description: Endpoints for resource allocations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Allocation:
 *       type: object
 *       required:
 *         - employee
 *         - project
 *         - allocationPercentage
 *         - startDate
 *         - endDate
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f8fbb3a0e6f9c3b0d6b2e9
 *         employee:
 *           type: string
 *           description: MongoDB ObjectId of the employee
 *           example: 60f7dd89a9b8df1a5c4d1af9
 *         project:
 *           type: string
 *           description: MongoDB ObjectId of the project
 *           example: 60f7df2da9b8df1a5c4d1b02
 *         allocationPercentage:
 *           type: number
 *           minimum: 1
 *           maximum: 100
 *           example: 75
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2024-07-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2024-10-31
 *         role:
 *           type: string
 *           example: Frontend Developer
 *         notes:
 *           type: string
 *           example: Available only in the mornings
 *         status:
 *           type: string
 *           enum: [Active, Upcoming, Completed, Cancelled]
 *           example: Active
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/allocation:
 *   get:
 *     summary: Get all allocations (Admins see all, employees see their own)
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all allocations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 allocations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Allocation'
 */
router.get('/', getAllAllocation);

/**
 * @swagger
 * /api/allocation/{id}:
 *   get:
 *     summary: Get allocation by ID
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Allocation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allocation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Allocation'
 *       404:
 *         description: Allocation not found
 */
router.get('/:id', getAllocationById);

/**
 * @swagger
 * /api/allocation:
 *   post:
 *     summary: Create a new allocation (Admin only)
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Allocation'
 *     responses:
 *       201:
 *         description: Allocation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 allocation:
 *                   $ref: '#/components/schemas/Allocation'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAdmin, createAllocation);

/**
 * @swagger
 * /api/allocation/{id}:
 *   put:
 *     summary: Update an allocation (Admin only)
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Allocation ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Allocation'
 *     responses:
 *       200:
 *         description: Allocation updated successfully
 *       404:
 *         description: Allocation not found
 */
router.put('/:id', isAdmin, updateAllocation);

/**
 * @swagger
 * /api/allocation/{id}:
 *   delete:
 *     summary: Delete allocation (Admin only)
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Allocation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allocation deleted successfully
 *       404:
 *         description: Allocation not found
 */
router.delete('/:id', isAdmin, deleteAllocation);

export default router;
