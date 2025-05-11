/**
 * OTP component for handling One-Time Password (OTP) verification in the authentication flow.
 *
 * This component renders an OTP input form using Formik for form state management and validation.
 * It displays a timer for resending the OTP, handles OTP input validation, and provides a link to sign up if the user is on the index screen.
 * The component uses custom hooks and Redux state to manage OTP logic and screen origin.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered OTP verification screen.
 *
 * @remarks
 * - Uses `useOtp` custom hook for OTP logic (resend, timer, etc.).
 * - Uses Formik for form handling and Yup for validation.
 * - Displays a countdown timer for resending OTP.
 * - Shows a sign-up link if the user is on the index screen.
 *
 * @dependencies
 * - React, React Native
 * - Formik
 * - Redux (`useSelector`)
 * - Custom components: `SignUpLink`, `Logo`, `Message`, `OTPInput`
 * - Custom hooks: `useOtp`
 * - Validation schema: `OtpSchema`
 * - Constants: `MESSAGES`, `icons`
 */
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Formik } from "formik";

import SignUpLink from "../components/auth/SignUpLink";
import Logo from "../components/common/Logo";
import Message from "../components/auth/Message";
import OTPInput from "../components/auth/OTPInput";
import { useOtp } from "../hooks/useOtp";
import { MESSAGES } from "@/utils/errorMessages";
import { OtpSchema } from "@/utils/validators";
import { icons } from "@/constants/icons";
import { useSelector } from "react-redux";
import { labels } from "@/constants/labels";

const OTP: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const screenValue = useSelector((state: any) => state.auth.otpScreenOrigin);

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={OtpSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {}}
    >
      {({ handleChange, values, errors, touched, setFieldTouched }) => {
        const { email, handleSignUp, loading, handleResendOTP, timer } = useOtp(
          screenValue,
          values.otp,
          (field, message) => {
            errors.otp = message;
          }
        );

        return (
          <View className="flex-1 bg-white p-4">
            {/* Center mail logo */}
            <View className="flex-1 justify-center">
              <View className="absolute top-40 left-1/2 -translate-x-1/2 items-center">
                <Logo source={icons.mail} size={100} />
              </View>

              <View className="absolute bottom-30 left-0 right-0 px-4">
                <Message
                  message={MESSAGES.OTP_MESSAGE}
                  append={email.slice(6)}
                />
                {/* OTP Inputs */}
                <OTPInput
                  otpValue={values.otp}
                  setOtpValue={(value) => {
                    handleChange("otp")(value);
                    if (value.length > 0) {
                      setFieldTouched("otp", true);
                    }
                  }}
                  isValidationEnabled={touched.otp}
                  isValid={!errors.otp}
                  errorMessage={errors.otp}
                />

                {/* OTP Resend Area */}
                <View className="min-h-[20px] items-center">
                  {timer > 0 ? (
                    <Text className="text-primary text-lg text-center">
                      {labels.resendOTPIn}{" "}
                      <Text className="text-primary text-center text-lg">{`00:${timer
                        .toString()
                        .padStart(2, "0")}`}</Text>
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={handleResendOTP}>
                      <Text
                        className={`text-lg text-center ${
                          timer > 0 ? "text-gray-400" : "text-primary font-bold"
                        }`}
                      >
                        {labels.resendOTP}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            {/* Sign Up Link */}
            {screenValue === "index" && (
              <View className="absolute bottom-20 left-0 right-0 px-4">
                <SignUpLink onPress={handleSignUp} />
              </View>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

export default OTP;
