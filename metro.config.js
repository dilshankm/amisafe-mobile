const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// 1. Get base config
const config = getDefaultConfig(__dirname);

// 2. Add persistence-friendly settings
config.cacheStores = [];
config.resetCache = false; // Prevents bundle re-downloads
config.transformer.minifierConfig = {
  keep_classnames: true, // Helps with Reanimated
  keep_fnames: true, // Helps with NativeWind
};

// 3. Apply Reanimated first (order matters!)
const reanimatedConfig = wrapWithReanimatedMetroConfig(config);

// 4. Then apply NativeWind
module.exports = withNativeWind(reanimatedConfig, {
  input: "./app/globals.css",
  // Add these for better caching
  projectRoot: __dirname,
  watchFolders: [__dirname],
});
