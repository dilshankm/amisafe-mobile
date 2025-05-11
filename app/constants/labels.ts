/**
 * An object containing constant label strings used throughout the application UI.
 * Each property represents a specific label for a screen or feature.
 */
export const labels = {
  // Authentication screens
  signup: "Sign Up",
  otp: "OTP",
  personalDetails: "Personal Details",
  termsAndConditions: "Terms and Conditions",
  locationService: "Location Service",
  homeLocation: "Home Location",
  postalCode: "Postal Code",
  crimeAlert: "Crime Alert",

  // Form fields and buttons
  email: "Email",
  login: "Login",
  alert: "Alert",
  name: "Name",
  mobile: "Mobile",
  next: "Next",
  agree: "Agree",
  dob: "Date of Birth",

  // Notification preferences
  emailNotifications: "Email Notifications",
  pushNotifications: "Push Notifications",
  alertRadius: "Alert Radius",
  finish: "Finish",

  // OTP
  resendOTP: "Resend OTP",
  resendOTPIn: "Resend OTP in",

  // Tab Navigation
  currentCrimeMap: "Current Crime Map",
  homeCrimeMap: "Home Crime Map",
  crimePredictions: "Crime Predictions",
  settings: "Settings",
  currentMap: "Current Map",
  homeMap: "Home Map",

  // Auth Links
  signUpLinkText: "Don't have an account? Sign up",

  // Settings Menu Items
  personalDetailsValue: "Personal Details",
  crimeAlertValue: "Crime Alert",
  logoutValue: "Logout",
  deleteAccountValue: "Delete Account",

  // Settings screen titles
  deleteAccount: "Delete Account",

  // Alert Dialogs
  logoutTitle: "Log out",
  logoutMessage: "Are you sure you want to log out from this account?",
  logoutConfirm: "Logout",
  logoutCancel: "Cancel",
  deleteTitle: "Delete Account",
  deleteMessage:
    "This will permanently delete your account and data. Are you sure?",
  deleteConfirm: "Delete",
  deleteCancel: "Cancel",
  ok: "OK",

  // Banner Messages
  noCrimesFound: "🎉 No recent crimes found!",
  areaIsSafe: "Your area looks safe for now. Stay alert and check back later.",

  // Alert Messages
  permissionDeniedTitle: "Permission Denied",
  permissionDeniedMessage: "Location access is required to continue.",
  errorTitle: "Error",
  errorMessage: "Failed to get your location.",

  //
  crimeTypes: "Top 3 Predicted Crime Types",
} as const;
