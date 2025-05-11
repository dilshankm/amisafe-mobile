/**
 * A reusable component that displays a detail field with a styled container.
 *
 * @param value - The string value to display inside the field. If not provided, the field will be empty.
 *
 * @example
 * <DetailField value="Username" />
 */
import React from "react";
import { Text, View } from "react-native";

interface DetailFieldProps {
  value?: string;
}

const DetailField: React.FC<DetailFieldProps> = ({ value }) => {
  return (
    <View className="w-full mt-6 flex-row items-center justify-between bg-secondary px-4 py-4 rounded-lg border border-transparent mb-2 min-h-[56px]">
      <Text className=" text-primary">{value}</Text>
    </View>
  );
};

export default DetailField;
