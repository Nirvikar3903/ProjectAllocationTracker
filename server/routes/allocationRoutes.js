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

router.use(verifyToken);

router.get('/', getAllAllocation); // Filter in controller by role: admin gets all, employee gets only their allocations
router.get('/:id', getAllocationById);

// Only admin can modify
router.post('/', isAdmin, createAllocation);
router.put('/:id', isAdmin, updateAllocation);
router.delete('/:id', isAdmin, deleteAllocation);

export default router;
