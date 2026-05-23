// getSettings
// updateSettings

import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as settingsService from "./settings.service.js";

const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettingsService();

  res.status(200).json({
    success: true,
    data: settings,
  });
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettingsService(req.body);

  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: settings,
  });
});

export { getSettings, updateSettings };
