/**
 * A customizable button component for authentication screens.
 *
 * @component
 * @param {Object} props - The props for the Button component.
 * @param {string} props.name - The text to display inside the button.
 * @param {() => void} props.onPress - Callback function to handle button press events.
 * @returns {JSX.Element} The rendered button component.
 */
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  name: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      className="w-full bg-primary p-4 rounded-xl justify-center items-center mt-4"
      onPress={onPress}
    >
      <Text className="text-white text-xl font-bold">{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;
