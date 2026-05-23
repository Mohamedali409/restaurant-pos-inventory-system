// إعدادات المطعم

// getSettingsService
// updateSettingsService

import * as settingsRepository from "./settings.repository.js";

const getSettingsService = async () => {
  const settings = await settingsRepository.findSettings();
  // لو مفيش settings خليه يرجع default
  return settings || {};
};

const updateSettingsService = async (data) => {
  return settingsRepository.updateSettings(data);
};

export { getSettingsService, updateSettingsService };
