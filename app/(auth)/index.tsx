/**
 * The `index` component renders the authentication screen for the application.
 *
 * This screen provides a form for users to enter their email address and log in.
 * It uses Formik for form state management and validation, and displays a mail logo,
 * an email input field, a login button, and a sign-up link.
 *
 * Features:
 * - Email input with validation and error messaging.
 * - Login button that triggers the login handler.
 * - Custom alert for displaying authentication messages.
 * - Sign-up link for users who need to create an account.
 *
 * Hooks:
 * - `useSignIn`: Provides handlers for login, sign-up, and alert state.
 *
 * @component
 */
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import Button from "../components/auth/Button";
import SignUpLink from "../components/auth/SignUpLink";
import Logo from "../components/common/Logo";
import TextInputField from "../components/auth/TextInputField";
import CustomAlert from "@/components/common/Alert";
import { icons } from "../constants/icons";
import { useSignIn } from "../hooks/useSignIn";
import { EmailSchema } from "../utils/validators";
import { MESSAGES } from "@/utils/errorMessages";
import { labels } from "@/constants/labels";
const index: React.FC = () => {
  const { handleLogin, handleSignUp, showAlert, alertMessage } = useSignIn();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={EmailSchema}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={false}
      onSubmit={(values) => handleLogin(values.email)}
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
              <Button onPress={handleSubmit} name={labels.login} />
              {showAlert && (
                <CustomAlert title={labels.alert} message={alertMessage} />
              )}
            </View>
          </View>

          {/* Sign-up link */}
          <View className="absolute bottom-20 left-0 right-0 px-4">
            <SignUpLink onPress={handleSignUp} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default index;
