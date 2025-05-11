/**
 * Custom React hook for handling OTP (One-Time Password) verification logic.
 *
 * This hook manages OTP validation, resend timer, and navigation after successful verification.
 * It integrates with Redux for authentication state and uses Expo Router for navigation.
 *
 * @param screen - The current screen context ("Login" or "SignUp") to determine navigation flow after OTP verification.
 * @param otp - The current OTP value entered by the user.
 * @param setFieldError - Callback to set field-specific error messages (e.g., for invalid OTP).
 *
 * @returns An object containing:
 * - `email`: The user's email from Redux state.
 * - `loading`: Boolean indicating if OTP verification is in progress.
 * - `handleSignUp`: Function to navigate to the SignUp screen.
 * - `handleResendOTP`: Function to resend the OTP if the timer has expired.
 * - `timer`: The countdown timer value (in seconds) for resending OTP.
 *
 * @example
 * const { email, loading, handleSignUp, handleResendOTP, timer } = useOtp(
 *   "Login",
 *   otp,
 *   setFieldError
 * );
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { verifyOtp } from "../services/otpService";
import { useRouter } from "expo-router";
import { sendOtp } from "../services/otpService";
import { loginSuccess, setEmailAction } from "../store/authSlice";
import { MESSAGES } from "../utils/errorMessages";

export const useOtp = (
  screen: string,
  otp: string,
  setFieldError: (field: string, message: string) => void
) => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Function to handle OTP resending
  const handleResendOTP = async () => {
    if (timer === 0) {
      try {
        setTimer(60);
        const result = await sendOtp(email);
        if (!result.success) {
          console.error("Failed to resend OTP:", result.message);
        } else {
          console.log("OTP resent to:", email);
        }
      } catch (err) {
        console.error("Resend OTP error:", err);
      }
    }
  };

  // Function to validate OTP
  // This function is called when the OTP input changes
  useEffect(() => {
    const validate = async () => {
      if (otp.length === 6) {
        setLoading(true);
        try {
          const res = await verifyOtp(email, otp);
          if (res.success) {
            dispatch(setEmailAction(email));
            dispatch(loginSuccess());
            if (screen === "Login") {
              router.push({
                pathname: "/(tabs)",
                params: { email },
              });
            } else if (screen === "SignUp") {
              router.push({
                pathname: "/(auth)/SignUpPersonal",
                params: { email },
              });
            }
          } else {
            setFieldError("otp", res.message || MESSAGES.OTP_INVALID);
          }
        } catch (error) {
          console.error("OTP validation error:", error);
          setFieldError("otp", MESSAGES.SOMETHING_WENT_WRONG);
        } finally {
          setLoading(false);
        }
      }
    };
    validate();
  }, [otp]);

  // Function to handle navigation to SignUp screen
  // This function is called when the user clicks on "Sign Up" link
  // It navigates the user to the SignUp screen
  // and resets the OTP input
  const handleSignUp = () => {
    router.push({ pathname: "/(auth)/SignUp" });
  };

  return {
    email,
    loading,
    handleSignUp,
    handleResendOTP,
    timer,
  };
};
