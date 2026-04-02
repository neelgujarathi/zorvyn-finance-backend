import express from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getRecentTransactions,
  getDashboardFull
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authmiddleware.js";
import { allowRoles } from "../middleware/rolemiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/full:
 *   get:
 *     summary: Get full dashboard data
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard data
 */

/**
 * @swagger
 * /api/dashboard/full:
 *   get:
 *     summary: Get full dashboard data
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard data
 */

router.get("/summary",
  protect,
  allowRoles("admin", "analyst", "viewer"),
  getSummary
);

router.get("/categories",
  protect,
  allowRoles("admin", "analyst", "viewer"),
  getCategoryBreakdown
);

router.get("/recent",
  protect,
  allowRoles("admin", "analyst", "viewer"),
  getRecentTransactions
);

router.get("/full",
  protect,
  allowRoles("admin", "analyst", "viewer"),
  getDashboardFull
);

export default router;