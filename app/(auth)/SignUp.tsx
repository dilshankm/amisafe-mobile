/**
 * SignUp component renders a sign-up form for user registration using Formik for form state management and validation.
 *
 * Features:
 * - Displays a centered mail logo.
 * - Provides an email input field with validation based on the `EmailSchema`.
 * - Shows validation errors and a custom alert for feedback.
 * - Submits the form using the `handleSignUp` handler from the `useSignUp` hook.
 *
 * @component
 * @returns {JSX.Element} The rendered sign-up form component.
 */
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import Button from "../components/auth/Button";
import Logo from "../components/common/Logo";
import TextInputField from "../components/auth/TextInputField";
import CustomAlert from "@/components/common/Alert";
import { icons } from "../constants/icons";
import { useSignUp } from "../hooks/useSignUp";
import { MESSAGES } from "@/utils/errorMessages";
import { labels } from "@/constants/labels";
const SignUp: React.FC = () => {
  const { handleSignUp, showAlert, alertMessage, EmailSchema } = useSignUp();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={EmailSchema}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={false}
      onSubmit={handleSignUp}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="flex-1 bg-white p-4">
          {/* Center mail logo */}
          <View className="flex-1 justify-center">
            <View className="absolute top-40 left-1/2 -translate-x-1/2 items-center">
              <Logo source={icons.mail} size={100} />
            </View>

            {/* Email input & login button */}
            <View className="absolute bottom-30 left-0 right-0 px-4 space-y-1">
              <TextInputField
                value={values.email}
                name={labels.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardSetting="email-address"
                isValidationEnabled={true}
                isValid={!errors.email}
                errorMessage={errors.email ?? MESSAGES.EMAIL_INVALID}
              />
              <Button onPress={handleSubmit} name={MESSAGES.CREATE_ACCOUNT} />
              {showAlert && (
                <CustomAlert title={labels.alert} message={alertMessage} />
              )}
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
