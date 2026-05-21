// GET /api/inventory
// GET /api/inventory/low-stock
// POST /api/inventory/adjust
// GET /api/inventory/:productId/history

import express from "express";
import * as inventoryController from "./inventory.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import allowTo from "../../shared/middleware/role.middleware.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/", inventoryController.getInventory);
inventoryRouter.get("/low-stock", inventoryController.getLowStock);
inventoryRouter.get("/out-of-stock", inventoryController.getOutOfStock);
inventoryRouter.get("/:productId/history", inventoryController.getStockHistory);
inventoryRouter.post(
  "/adjust",
  protect,
  allowTo("admin", "manager"),
  inventoryController.adjustStock,
);
inventoryRouter.patch(
  "/:productId/reorder-level",
  protect,
  allowTo("admin", "manager"),
  inventoryController.updateReorderLevel,
);

export default inventoryRouter;
