/**
 * Configuration object for Firebase action code settings.
 *
 * This object is used to specify how Firebase should handle action codes
 * (such as email verification and password reset) for the app.
 *
 * @property {string} url - The URL to which the user will be redirected after completing the action.
 * @property {boolean} handleCodeInApp - Whether the action code link will be handled in the app.
 * @property {object} android - Android-specific settings.
 * @property {string} android.packageName - The package name of the Android app.
 * @property {boolean} android.installApp - Whether to prompt the user to install the app if not already installed.
 * @property {string} android.minimumVersion - The minimum version of the app that can handle the action code.
 * @property {object} iOS - iOS-specific settings.
 * @property {string} iOS.bundleId - The bundle ID of the iOS app.
 */
export const actionCodeSettings = {
  url: "https://am-i-safe-61709.firebaseapp.com",
  handleCodeInApp: true,
  android: {
    packageName: "com.kodithuwakku.amisafe",
    installApp: true,
    minimumVersion: "21",
  },
  iOS: {
    bundleId: "com.kodithuwakku.amisafe",
  },
};
