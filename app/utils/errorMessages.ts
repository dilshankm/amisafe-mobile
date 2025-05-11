/**
 * Collection of constant messages used throughout the application.
 *
 * @constant
 * @type {Object}
 * @property {string} EMAIL_REQUIRED - Message for required email field
 * @property {string} EMAIL_INVALID - Message for invalid email format
 * @property {string} EMAIL_NOT_FOUND - Message for email not found
 * @property {string} ALERT - Generic alert message
 * @property {string} OTP_SENT - Success message for OTP sending
 * @property {string} OTP_FAILED - Error message for OTP sending failure
 * @property {string} OTP_INVALID - Error message for invalid OTP
 * @property {string} OTP_EXPIRED - Error message for expired OTP
 * @property {string} OTP_VERIFIED - Success message for OTP verification
 * @property {string} OTP_NOT_VERIFIED - Error message for OTP verification failure
 * @property {string} OTP_RESEND - Success message for OTP resending
 * @property {string} OTP_MESSAGE - Information message about OTP sending
 * @property {string} GOOD_MORNING - Greeting message for morning
 * @property {string} GOOD_AFTERNOON - Greeting message for afternoon
 * @property {string} GOOD_EVENING - Greeting message for evening
 * @property {string} GOOD_NIGHT - Greeting message for night
 * @property {string} CRIME_STATUS_AT - Label for crime status location
 * @property {string} STAY_INFORMED - Information message about crime reports
 * @property {string} CREATE_ACCOUNT - Label for account creation
 * @property {string} FILL_ALL_FIELDS - Validation message for empty fields
 * @property {string} NAME_INVALID - Validation message for invalid name
 * @property {string} MOBILE_INVALID - Validation message for invalid mobile number
 * @property {string} DOB_INVALID - Validation message for invalid date of birth
 * @property {string} NAME_REQUIRED - Validation message for required name field
 * @property {string} MOBILE_REQUIRED - Validation message for required mobile field
 * @property {string} SOMETHING_WENT_WRONG - Generic error message
 * @property {string} NETWORK_ERROR - Network error message
 * @property {string} LOCATION_PERMISSION_DENIED - Error message for location permission denial
 * @property {string} LOCATION_FETCH_FAILED - Error message for location fetch failure
 */
export const MESSAGES = {
  // Email related messages
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  EMAIL_NOT_FOUND: "Email not found. Please sign up.",
  EMAIL_EXISTS:
    "Looks like you already have an account. Try signing in instead.",

  ALERT: "Alert",
  OTP_SENT: "OTP Sent Successfully!",
  OTP_FAILED: "Failed to send OTP. Please try again.",
  OTP_INVALID: "Invalid OTP. Please try again.",
  OTP_EXPIRED: "OTP has expired. Please request a new one.",
  OTP_VERIFIED: "OTP verified successfully!",
  OTP_NOT_VERIFIED: "OTP not verified. Please try again.",
  OTP_RESEND: "OTP resent successfully!",
  OTP_MESSAGE: "We will send you a one time OTP on the email ending",
  GOOD_MORNING: "Good Morning",
  GOOD_AFTERNOON: "Good Afternoon",
  GOOD_EVENING: "Good Evening",
  GOOD_NIGHT: "Good Night",
  CRIME_STATUS_AT: "Crime Status at",
  STAY_INFORMED:
    "Stay informed about recent crime reports in your area. Stay safe!",
  CREATE_ACCOUNT: "Create Account",
  FILL_ALL_FIELDS: "Please fill in all fields",
  NAME_INVALID: "Invalid name",
  MOBILE_INVALID: "Invalid mobile number",
  DOB_INVALID: "Invalid date of birth",
  NAME_REQUIRED: "Name is required.",
  MOBILE_REQUIRED: "Mobile number is required.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",

  // Location related messages
  LOCATION_PERMISSION_DENIED: "Permission to access location was denied",
  LOCATION_FETCH_FAILED: "Failed to fetch location",
  COORDINATES_FETCH_ERROR: "Unable to fetch coordinates.",
  COORDINATES_SERVER_ERROR: "Server error while looking up coordinates.",

  // Crime related messages
  FAILED_TO_LOAD_CRIMES: "Failed to load crimes",

  // General error messages
  SERVER_ERROR: "Failed to connect to server",

  // User related messages
  USER_CREATE_FAILED: "User creation failed",
  USER_UPDATE_FAILED: "Failed to update user",
  USER_DELETE_FAILED: "Failed to delete user",
  USER_DELETE_SUCCESS: "User deleted successfully",
  USER_UPDATE_SUCCESS: "User updated successfully",

  // Validation Messages
  VALIDATION: {
    // OTP
    OTP_REQUIRED: "OTP is required",

    // Email
    EMAIL_FORMAT: "Invalid email format",
    EMAIL_REQUIRED: "Email is required",

    // Postal Code
    POSTAL_CODE_INVALID: "Invalid UK postal code",
    POSTAL_CODE_REQUIRED: "Postal code is required",

    // Name
    NAME_TOO_SHORT: "Name too short",
    NAME_TOO_LONG: "Name too long",
    NAME_REQUIRED: "Name is required",

    // Mobile
    MOBILE_FORMAT: "Mobile must be 10 digits",
    MOBILE_REQUIRED: "Mobile is required",

    // Date of Birth
    DOB_DAY_RANGE: "Day must be between 1-31",
    DOB_DAY_REQUIRED: "Day is required",
    DOB_MONTH_RANGE: "Month must be between 1-12",
    DOB_MONTH_REQUIRED: "Month is required",
    DOB_YEAR_RANGE: "Year must be between 1900-2099",
    DOB_YEAR_REQUIRED: "Year is required",
    DOB_INVALID: "Invalid date (does not exist)",
    DOB_FUTURE: "Date cannot be in the future",
    DOB_AGE: "You must be at least 13 years old",
  },
  CRIME_PREDICTION_BETA_NOTICE:
    "This feature is in beta. Crime predictions are currently 50% accurate and will improve over time. Stay safe and alert in your area!",
  NO_CRIME_PREDICTION_NOTICE: "No Crime Predict",
} as const;
