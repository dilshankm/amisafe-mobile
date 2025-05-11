/**
 * A reusable React Native component for entering a date of birth (DOB) as three separate fields: day, month, and year.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ day: string; month: string; year: string }} props.dobValue - The current values for day, month, and year.
 * @param {FormikHandlers["handleChange"]} props.handleChange - Formik's handleChange function for input changes.
 * @param {FormikHandlers["handleBlur"]} props.handleBlur - Formik's handleBlur function for input blur events.
 * @param {{ day?: string; month?: string; year?: string }} props.errors - Validation errors for each DOB field.
 * @param {{ day?: boolean; month?: boolean; year?: boolean }} props.touched - Touched state for each DOB field.
 * @param {(field: string, value: any, shouldValidate?: boolean) => void} props.setFieldValue - Formik's setFieldValue function to update DOB fields.
 *
 * @returns {JSX.Element} The rendered DOB input fields with validation and error display.
 */
import React from "react";
import { View, TextInput, Text } from "react-native";
import { colors } from "@/constants/theme";
import { FormikHandlers, FormikTouched, FormikErrors } from "formik";

interface DOBInputProps {
  dobValue: { day: string; month: string; year: string };
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  errors: { day?: string; month?: string; year?: string };
  touched: { day?: boolean; month?: boolean; year?: boolean };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const DOBInput: React.FC<DOBInputProps> = ({
  dobValue,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) => {
  const fields = [
    { key: "day", maxLength: 2, placeholder: "Day" },
    { key: "month", maxLength: 2, placeholder: "Month" },
    { key: "year", maxLength: 4, placeholder: "Year" },
  ];

  const handleDOBChange =
    (field: "day" | "month" | "year") => (text: string) => {
      // Update the specific field in the dob object
      const updatedDOB = {
        ...dobValue,
        [field]: text,
      };
      setFieldValue("dob", updatedDOB);
    };

  const hasError =
    (touched?.day && errors?.day) ||
    (touched?.month && errors?.month) ||
    (touched?.year && errors?.year);

  const errorMessage =
    errors?.day || errors?.month || errors?.year || undefined;

  return (
    <View className="mb-4">
      <Text className="text-primary text-sm mb-1 ml-1">Date of Birth</Text>
      <View className="flex-row justify-between space-x-3">
        {fields.map((field) => (
          <View
            key={field.key}
            className="flex-1 h-14 rounded-lg bg-secondary border-2 mx-1 justify-center "
            style={{
              borderColor:
                touched[field.key as keyof typeof touched] &&
                errors[field.key as keyof typeof errors]
                  ? colors.red
                  : touched[field.key as keyof typeof touched]
                  ? colors.secondary
                  : "transparent",
            }}
          >
            <TextInput
              value={dobValue[field.key as keyof typeof dobValue]}
              onChangeText={handleDOBChange(
                field.key as "day" | "month" | "year"
              )}
              onBlur={handleBlur(`dob.${field.key}`)}
              placeholder={field.placeholder}
              placeholderTextColor={colors.primary}
              keyboardType="number-pad"
              maxLength={field.maxLength}
              textAlign="center"
              className="w-full h-full text-large"
              style={{
                color: colors.primary,
                lineHeight: 18,
                paddingVertical: 0,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            />
          </View>
        ))}
      </View>

      <View className="min-h-[24px] mt-2 items-start">
        {hasError && (
          <Text className="text-red text-sm mt-1">{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default DOBInput;
