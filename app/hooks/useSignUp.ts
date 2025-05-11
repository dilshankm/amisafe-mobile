/**
 * Custom hook to handle the sign-up process, including email validation,
 * OTP (One-Time Password) flow, and alert management.
 *
 * @returns An object containing:
 * - `handleSignUp`: Function to initiate the sign-up process with email validation and OTP sending.
 * - `showAlert`: Boolean indicating whether an alert should be shown.
 * - `alertMessage`: The message to display in the alert, if any.
 * - `EmailSchema`: The validation schema for the email field.
 *
 * @example
 * const { handleSignUp, showAlert, alertMessage, EmailSchema } = useSignUp();
 */
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormikHelpers } from "formik";
import { sendOtp } from "../services/otpService";
import { MESSAGES } from "../utils/errorMessages";
import { setEmailAction } from "../store/authSlice";
import { EmailSchema } from "../utils/validators";
import { fetchUserByEmail } from "@/services/userService";
import { setOtpScreenOrigin } from "../store/authSlice";
import { showAlertMessage } from "../utils/alertUtils";

export const useSignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  //  Function to handle OTP flow
  const handleOtpFlow = async (
    email: string,
    formikHelpers?: FormikHelpers<{ email: string }>
  ) => {
    try {
      const result = await sendOtp(email);
      if (result.success) {
        showAlertMessage(result.message, MESSAGES.OTP_SENT, {
          setAlertMessage,
          setShowAlert,
        });
        dispatch(setEmailAction(email));
        dispatch(setOtpScreenOrigin("SignUp"));
        router.push({
          pathname: `/(auth)/OTP`,
        });
      } else {
        console.log("Error", result.message);
        formikHelpers?.setFieldError("email", result.message);
      }
    } catch (error) {
      console.log("Error", error);
      formikHelpers?.setFieldError("email", MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  //  Function to handle sign-up
  const handleSignUp = async (
    values: { email: string },
    formikHelpers: FormikHelpers<{ email: string }>
  ) => {
    const userRes = await fetchUserByEmail(values.email);
    console.log("uuu", userRes);
    if (userRes.success || userRes.data) {
      showAlertMessage(userRes.message, MESSAGES.EMAIL_EXISTS, {
        setAlertMessage,
        setShowAlert,
      });
      return;
    }
    await handleOtpFlow(values.email);
    return;
  };

  return {
    handleSignUp,
    showAlert,
    alertMessage,
    EmailSchema,
  };
};
