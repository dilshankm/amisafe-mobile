/**
 * HomeLocation is a React functional component that renders a form for users to input their postal code as their home location.
 *
 * The component uses Formik for form state management and validation, and applies a validation schema (`PostalCodeSchema`) to the postal code input.
 *
 * Features:
 * - Displays a logo at the top center of the screen.
 * - Provides a text input field for entering a postal code, automatically converting input to uppercase.
 * - Shows validation errors for the postal code field.
 * - Includes a button to submit the form, triggering the `handlePostalCode` function from the `useHomeLocation` hook.
 *
 * @component
 * @returns {JSX.Element} The rendered HomeLocation form component.
 */
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import Button from "../components/auth/Button";
import Logo from "../components/common/Logo";
import { icons } from "../constants/icons";
import TextInputField from "../components/auth/TextInputField";
import { PostalCodeSchema } from "../utils/validators";
import { useHomeLocation } from "../hooks/useHomeLocation";
import { labels } from "@/constants/labels";

const HomeLocation: React.FC = () => {
  const { handlePostalCode } = useHomeLocation();

  return (
    <Formik
      initialValues={{ postalCode: "" }}
      validationSchema={PostalCodeSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={handlePostalCode}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <View className="flex-1 bg-white p-4">
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="absolute top-20 left-1/2 -translate-x-1/2 items-center">
              <Logo source={icons.homeLocation} size={200} />
            </View>

            {/* Postal Code Input & Button */}
            <View className="absolute bottom-48 left-0 right-0 px-4 space-y-1">
              <TextInputField
                value={values.postalCode}
                name={labels.postalCode}
                onChangeText={(text) => {
                  handleChange("postalCode")(text.toUpperCase());
                }}
                onBlur={handleBlur("postalCode")}
                keyboardSetting="default"
                isValidationEnabled={true}
                isValid={!errors.postalCode}
                errorMessage={errors.postalCode}
              />
              <Button onPress={handleSubmit} name={labels.homeLocation} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default HomeLocation;
