/**
 * SignUpPersonal is a React functional component that renders a personal sign-up form
 * using Formik for form state management and validation. The form collects the user's
 * name, mobile number, and date of birth (DOB), and displays validation errors as needed.
 *
 * Features:
 * - Uses a custom `usePersonalSignUp` hook to handle form submission.
 * - Utilizes Formik for form state, validation, and submission handling.
 * - Includes custom input components: `TextInputField` for name and mobile, and `DOBInput` for date of birth.
 * - Displays a logo at the top and a submit button at the bottom.
 * - Provides real-time validation feedback for each field.
 *
 * @component
 * @example
 * ```tsx
 * <SignUpPersonal />
 * ```
 */
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import Button from "../components/auth/Button";
import Logo from "../components/common/Logo";
import { icons } from "../constants/icons";
import TextInputField from "../components/auth/TextInputField";
import DOBInput from "@/components/common/DOBInput";
import { SignUpSchema } from "../utils/validators";
import { usePersonalSignUp } from "@/hooks/userPersonalSignUp";
import { labels } from "@/constants/labels";
const SignUpPersonal: React.FC = () => {
  const { handlePersonalSubmit } = usePersonalSignUp();
  return (
    <Formik
      initialValues={{
        name: "",
        mobile: "",
        dob: { day: "", month: "", year: "" },
      }}
      validationSchema={SignUpSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={handlePersonalSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View className="flex-1 bg-white p-4">
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="absolute top-20 left-1/2 -translate-x-1/2 items-center">
              <Logo source={icons.personal} size={100} />
            </View>

            {/* Form Fields */}
            <View className="absolute bottom-31 left-0 right-0 px-4 space-y-1">
              {/* Name */}
              <TextInputField
                value={values.name}
                name={labels.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                keyboardSetting="default"
                isValidationEnabled={!!touched.name}
                isValid={!errors.name}
                errorMessage={errors.name}
              />

              {/* Mobile */}
              <TextInputField
                value={values.mobile}
                name={labels.mobile}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                keyboardSetting="phone-pad"
                isValidationEnabled={!!touched.mobile}
                isValid={!errors.mobile}
                errorMessage={errors.mobile}
              />

              {/* DOB */}
              <DOBInput
                dobValue={values.dob}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                errors={errors.dob ?? {}}
                touched={touched.dob ?? {}}
              />

              {/* Submit Button */}
              <Button onPress={handleSubmit} name={labels.next} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUpPersonal;
