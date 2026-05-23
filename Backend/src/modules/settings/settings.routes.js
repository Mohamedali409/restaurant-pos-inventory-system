// GET / api / settings;
// PUT / api / settings;

// getSettingsRoute
// updateSettingsRoute

import express from "express";
import * as settingsController from "./settings.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import allowTo from "../../shared/middleware/role.middleware.js";

const settingsRouter = express.Router();

settingsRouter.get("/", settingsController.getSettings);

settingsRouter.put(
  "/",
  protect,
  allowTo("admin"),
  settingsController.updateSettings,
);

export default settingsRouter;
