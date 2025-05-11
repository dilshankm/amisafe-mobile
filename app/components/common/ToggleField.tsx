/**
 * A reusable toggle switch field component for React Native.
 *
 * @component
 * @param {ToggleFieldProps} props - The props for the ToggleField component.
 * @param {string} props.label - The label displayed next to the toggle switch.
 * @param {boolean} props.value - The current value of the toggle switch.
 * @param {(value: boolean) => void} props.onValueChange - Callback function called when the switch value changes.
 *
 * @example
 * <ToggleField
 *   label="Enable notifications"
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 * />
 */
import React from "react";
import { View, Text, Switch } from "react-native";
import { colors } from "@/constants/theme";

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleField: React.FC<ToggleFieldProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <View className="w-full mt-6 flex-row items-center justify-between bg-secondary px-4 py-4 rounded-lg border border-transparent mb-2 min-h-[56px]">
      <Text className="text-primary text-base">{label}</Text>
      <Switch
        trackColor={{
          false: colors.secondary,
          true: colors.primary,
        }}
        thumbColor="#fff"
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default ToggleField;
