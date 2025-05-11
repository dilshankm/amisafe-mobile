/**
 * Custom React hook for handling user sign-in logic.
 *
 * This hook provides methods to handle user login and navigation to the sign-up screen.
 * It manages alert state for user feedback and interacts with Redux for authentication state.
 *
 * @returns An object containing:
 * - `handleLogin`: Async function to initiate login with email, send OTP, and update Redux state.
 * - `handleSignUp`: Function to navigate to the sign-up screen.
 * - `showAlert`: Boolean indicating if an alert should be shown.
 * - `alertMessage`: The current alert message to display, or null if none.
 *
 * @example
 * const { handleLogin, handleSignUp, showAlert, alertMessage } = useSignIn();
 */
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/otpService";
import { fetchUserByEmail } from "../services/userService";
import { MESSAGES } from "../utils/errorMessages";
import { setEmailAction, setPersonalInfoAction } from "../store/authSlice";
import { setOtpScreenOrigin } from "../store/authSlice";
import { showAlertMessage } from "../utils/alertUtils";
import { labels } from "@/constants/labels";

export const useSignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Handle login
  const handleLogin = async (email: string) => {
    try {
      //  Validate email
      const userRes = await fetchUserByEmail(email);
      if (!userRes.success || !userRes.data) {
        showAlertMessage(userRes.message, MESSAGES.EMAIL_NOT_FOUND, {
          setAlertMessage,
          setShowAlert,
        });
        return;
      }

      const user = userRes.data;

      //  Send OTP
      const result = await sendOtp(email);
      if (!result.success) {
        showAlertMessage(result.message, result.message, {
          setAlertMessage,
          setShowAlert,
        });
        return;
      }

      // Store email and user info in Redux
      dispatch(setEmailAction(email));
      dispatch(
        setPersonalInfoAction({
          name: user.name,
          mobile: user.mobile,
          dob: user.dob,
          postalCode: user.currentLocation?.street?.name || "",
          locationCoords: user.currentLocation
            ? {
                latitude: parseFloat(user.currentLocation.latitude),
                longitude: parseFloat(user.currentLocation.longitude),
              }
            : undefined,
          crimeAlerts: {
            emailEnabled: user.preferences?.emailNotifications,
            pushEnabled: user.preferences?.pushNotifications,
            alertRadius: user.preferences?.alertRadius?.toString(),
          },
        })
      );

      //Show success + go to OTP screen
      setAlertMessage(MESSAGES.OTP_SENT);
      setShowAlert(true);
      dispatch(setOtpScreenOrigin(labels.login));
      router.push({
        pathname: `/(auth)/OTP`,
      });
    } catch (error) {
      setAlertMessage(MESSAGES.SOMETHING_WENT_WRONG);
      setShowAlert(true);
    }
  };
  // Handle sign up
  const handleSignUp = () => {
    console.log("handleSignUp");
    router.push({
      pathname: `/(auth)/SignUp`,
    });
  };

  return {
    handleLogin,
    handleSignUp,
    showAlert,
    alertMessage,
  };
};
