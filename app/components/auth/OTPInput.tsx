/**
 * OTPInput is a React Native component for entering a 6-digit One-Time Password (OTP).
 * It renders six individual input fields, each accepting a single digit, and manages focus
 * automatically as the user types or deletes digits. The component also provides validation
 * feedback and displays an error message when the OTP is invalid.
 *
 * @component
 * @param {string} otpValue - The current OTP value as a string.
 * @param {(value: string) => void} setOtpValue - Callback to update the OTP value.
 * @param {boolean} [isValidationEnabled=false] - Enables validation and error display.
 * @param {boolean} [isValid=true] - Indicates if the current OTP value is valid.
 * @param {string} [errorMessage=MESSAGES.OTP_INVALID] - Custom error message to display on validation failure.
 *
 * @example
 * <OTPInput
 *   otpValue={otp}
 *   setOtpValue={setOtp}
 *   isValidationEnabled={isValidationEnabled}
 *   isValid={isOtpValid}
 *   errorMessage="Invalid OTP"
 * />
 */
import React, { useRef } from "react";
import { View, TextInput, Text } from "react-native";
import { colors } from "@/constants/theme";
import { MESSAGES } from "@/utils/errorMessages";

interface OTPInputProps {
  otpValue: string;
  setOtpValue: (value: string) => void;
  isValidationEnabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  otpValue,
  setOtpValue,
  isValidationEnabled = false,
  isValid = true,
  errorMessage = MESSAGES.OTP_INVALID,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = otpValue.padEnd(6, " ").split("");
    newOtp[index] = text;
    const joinedOtp = newOtp.join("").trim();
    setOtpValue(joinedOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const hasError =
    isValidationEnabled && !isValid && otpValue?.trim().length === 6;

  return (
    <View className="mb-4">
      <View className="flex-row justify-between space-x-4">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <View
              key={index}
              className="w-12 h-12 rounded-lg bg-secondary border-2 items-center justify-center"
              style={{
                borderColor: hasError ? colors.red : colors.primary,
              }}
            >
              <TextInput
                ref={(el) => (inputRefs.current[index] = el)}
                value={otpValue[index] || ""}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                placeholderTextColor={colors.primary}
                keyboardType="numeric"
                textAlign="center"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                maxLength={1}
                className="text-xl w-12 h-12"
                style={{
                  color: colors.primary,
                  fontSize: 20,
                  lineHeight: 24,
                  paddingVertical: 0,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              />
            </View>
          ))}
      </View>

      {/* Always reserve space to avoid layout shift */}
      <View className="min-h-[24px] mt-2 items-center">
        {hasError && (
          <Text className="text-red text-sm text-center">{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default OTPInput;
