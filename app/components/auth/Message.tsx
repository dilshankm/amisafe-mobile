/**
 * Displays a message inside a styled container.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.message - The main message to display.
 * @param {string} [props.append] - Optional string to append to the message.
 * @returns {JSX.Element} The rendered message component.
 */
import React from "react";
import { View, Text } from "react-native";

interface MessageProps {
  message: string;
  append?: string;
}

const Message: React.FC<MessageProps> = ({ message, append }) => {
  return (
    <View className="items-center mb-4">
      <Text className="text-center text-lg text-primary">
        {append ? `${message} ${append}` : message}
      </Text>
    </View>
  );
};

export default Message;
