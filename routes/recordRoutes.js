import express from "express";
import {
  createRecord,
  getRecords,
  getSingleRecord,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";

import { protect } from "../middleware/authmiddleware.js";
import { allowRoles } from "../middleware/rolemiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: List of records
 */

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 example: 2024-04-01
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Record created
 */

// CREATE
router.post("/", protect, allowRoles("admin"), createRecord);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: List of records
 */

// GET ALL
router.get("/", protect, allowRoles("admin", "analyst"), getRecords);

// GET SINGLE
router.get("/:id", protect, allowRoles("admin", "analyst", "viewer"), getSingleRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Record updated
 */

// UPDATE (ADMIN ONLY)
router.put("/:id", protect, allowRoles("admin"), updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Record deleted
 */

// DELETE (ADMIN ONLY)
router.delete("/:id", protect, allowRoles("admin"), deleteRecord);

export default router;