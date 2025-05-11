/**
 * Redux slice for managing authentication state
 * @module authSlice
 *
 * @typedef {Object} PersonalInfo User's personal information
 * @property {string} [name] - User's name
 * @property {string} [mobile] - User's mobile number
 * @property {string} [dob] - User's date of birth
 * @property {boolean} [termsAccepted] - Whether user accepted terms
 * @property {boolean} [enableLocation] - Whether location is enabled
 * @property {{latitude: number, longitude: number}} [locationCoords] - User's location coordinates
 * @property {string} [postalCode] - User's postal code
 * @property {{emailEnabled: boolean, pushEnabled: boolean, alertRadius: string}} [crimeAlerts] - Crime alert preferences
 *
 * @typedef {Object} AuthState Authentication state
 * @property {string} email - User's email address
 * @property {PersonalInfo} personalInfo - User's personal information
 * @property {("SignUp"|"Login"|null)} otpScreenOrigin - Origin screen for OTP verification
 * @property {boolean} isLoggedIn - User's login status
 *
 * @exports {Object} Actions
 * @property {Function} setEmailAction - Sets user email
 * @property {Function} setPersonalInfoAction - Updates personal information
 * @property {Function} setOtpScreenOrigin - Sets OTP screen origin
 * @property {Function} loginSuccess - Sets login status to true
 * @property {Function} logout - Logs out user and clears state
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  name?: string;
  mobile?: string;
  dob?: string;
  termsAccepted?: boolean;
  enableLocation?: boolean;
  locationCoords?: { latitude: number; longitude: number };
  postalCode?: string;
  crimeAlerts?: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    alertRadius: string;
  };
}

interface AuthState {
  email: string;
  personalInfo: PersonalInfo;
  otpScreenOrigin: OtpScreenOrigin;
  isLoggedIn: boolean;
}
const initialState: AuthState = {
  email: "",
  personalInfo: {},
  otpScreenOrigin: null,
  isLoggedIn: false,
};

type OtpScreenOrigin = "SignUp" | "Login" | null;

// Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailAction(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPersonalInfoAction(state, action: PayloadAction<PersonalInfo>) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },
    setOtpScreenOrigin(state, action: PayloadAction<OtpScreenOrigin>) {
      state.otpScreenOrigin = action.payload;
    },
    loginSuccess(state) {
      console.log("Login successful");
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = "";
      state.personalInfo = {};
    },
  },
});

export const {
  setEmailAction,
  setPersonalInfoAction,
  setOtpScreenOrigin,
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
