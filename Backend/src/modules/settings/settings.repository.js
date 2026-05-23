// findSettings
// updateSettings

import Settings from "./settings.model.js";

const findSettings = () => {
  return Settings.findOne({});
};

const updateSettings = (data) => {
  return Settings.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
    runValidators: true,
  });
};

export { findSettings, updateSettings };
