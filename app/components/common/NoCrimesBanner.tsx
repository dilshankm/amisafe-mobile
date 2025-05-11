/**
 * A banner component that displays a congratulatory message when no recent crimes are found.
 *
 * This component overlays the screen with a centered message indicating that the user's area appears safe.
 * It is intended to provide positive feedback and reassurance to the user.
 *
 * @returns {JSX.Element} The rendered banner component.
 */
import React from "react";
import { View, Text } from "react-native";
import { labels } from "@/constants/labels";

const NoCrimesBanner: React.FC = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center px-4">
      <View className="bg-white px-4 py-2 rounded-xl">
        <Text className="text-xl font-bold text-green-700 text-center">
          {labels.noCrimesFound}
        </Text>
        <Text className="text-base text-gray-700 mt-2 text-center">
          {labels.areaIsSafe}
        </Text>
      </View>
    </View>
  );
};

export default NoCrimesBanner;
