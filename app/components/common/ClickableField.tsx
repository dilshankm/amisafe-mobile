/**
 * A reusable clickable field component that displays a value and a chevron icon.
 * Typically used for navigation or selection fields in forms or lists.
 *
 * @param {ClickableFieldProps} props - The props for the ClickableField component.
 * @param {string} props.label - The label for the field (currently unused in rendering).
 * @param {string} [props.value] - The value to display in the field.
 * @param {() => void} props.onPress - Callback function invoked when the field is pressed.
 * @param {string} [props.testID] - Optional test identifier for testing purposes.
 *
 * @returns {JSX.Element} The rendered clickable field component.
 */
import React from "react";
import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

interface ClickableFieldProps {
  label: string;
  value?: string;
  onPress: () => void;
  testID?: string;
}

const ClickableField: React.FC<ClickableFieldProps> = ({
  label,
  value,
  onPress,
  testID,
}) => {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      className="w-full mt-6 flex-row items-center justify-between bg-secondary px-4 py-4 rounded-lg border border-transparent mb-2 min-h-[56px]"
    >
      <Text className=" text-primary">{value}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </Pressable>
  );
};

export default ClickableField;
