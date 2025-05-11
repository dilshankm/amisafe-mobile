/**
 * A reusable text input field component for React Native with optional validation and customization.
 *
 * @component
 * @param {string} value - The current value of the input field.
 * @param {string} name - The placeholder text for the input field.
 * @param {(text: string) => void} [onChangeText] - Callback function called when the text changes.
 * @param {KeyboardTypeOptions} [keyboardSetting] - Keyboard type for the input field.
 * @param {boolean} [isValidationEnabled=false] - Enables or disables validation display.
 * @param {string} [errorMessage=""] - Custom error message to display when invalid.
 * @param {boolean} [isValid=true] - Indicates if the input value is valid.
 * @param {string} [keyboardType="default"] - Keyboard type as a string (fallback).
 * @param {number} [maxLength] - Maximum number of characters allowed.
 * @param {"none" | "sentences" | "words" | "characters"} [autoCapitalize="none"] - Controls automatic capitalization.
 * @param {(e: any) => void} [onBlur] - Callback function called when the input loses focus.
 * @param {"none" | "box-none" | "auto"} [pointerEvents="auto"] - Controls pointer event behavior.
 * @param {boolean} [editable=true] - Whether the input is editable.
 * @param {string} [className=""] - Additional class names for styling.
 *
 * @returns {JSX.Element} The rendered text input field with optional validation message.
 */
import React from "react";
import { View, TextInput, KeyboardTypeOptions, Text } from "react-native";
import { colors } from "../../constants/theme";

interface TextInputFieldProps {
  value: string;
  name: string;
  onChangeText?: (text: string) => void;
  keyboardSetting?: KeyboardTypeOptions;
  isValidationEnabled?: boolean;
  errorMessage?: string;
  isValid?: boolean;
  keyboardType?: string;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onBlur?: (e: any) => void;
  pointerEvents?: "none" | "box-none" | "auto";
  editable?: boolean;
  className?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  name,
  onChangeText,
  keyboardSetting,
  isValidationEnabled = false,
  errorMessage = "",
  isValid = true,
  keyboardType = "default",
  maxLength,
  autoCapitalize = "none",
  onBlur,
  pointerEvents = "auto",
  editable = true,
  className = "",
}) => {
  const baseClasses = `w-full bg-secondary p-4 rounded-lg border ${
    isValidationEnabled && !isValid ? "border-red" : "border-transparent"
  }`;

  const combinedClasses = `${baseClasses} ${className}`;
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={name}
        maxLength={maxLength}
        placeholderTextColor={colors.primary}
        keyboardType={keyboardSetting || "default"}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        pointerEvents={pointerEvents}
        autoCorrect={false}
        editable={editable}
        className={combinedClasses}
        style={{ color: colors.primary }}
      />
      {/* Display error message if validation is enabled and input is invalid */}
      <View className="min-h-[20px] mt-1">
        {isValidationEnabled && !isValid && (
          <Text className="text-red text-m">{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default TextInputField;
