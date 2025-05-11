import React from "react";
import { View, Text } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { colors } from "@/constants/theme";

interface DropdownFieldProps {
  label: string;
  open: boolean;
  value: string;
  items: ItemType<string>[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (callback: (curr: string) => string) => void;
  style?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  open,
  value,
  items,
  setOpen,
  setValue,
  style,
}) => {
  return (
    <View className={style}>
      <Text className="text-primary text-base">{label}</Text>
      {/* Drop Down Picker */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={(value) => setOpen(value)}
        setValue={setValue}
        setItems={() => {}}
        style={{
          backgroundColor: "'transparent', ",
          borderRadius: 8,
          borderWidth: 0,
          paddingHorizontal: 12,
          height: 30,
          width: 140,
          marginLeft: "auto",
          alignSelf: "flex-end",
        }}
        containerStyle={{
          width: 125,
        }}
        textStyle={{
          color: colors.primary,
          fontSize: 16,
        }}
        dropDownContainerStyle={{
          borderColor: colors.secondary,
          borderWidth: 1,
          borderRadius: 8,
          width: 140,
          marginLeft: "auto",
        }}
        listItemContainerStyle={{
          paddingVertical: 8,
        }}
        dropDownDirection="AUTO"
      />
    </View>
  );
};

export default DropdownField;
