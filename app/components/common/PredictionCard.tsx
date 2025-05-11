/**
 * A component that displays crime prediction results in a card format.
 *
 * @component
 * @param {Object} props - The component props
 * @param {CrimePredictionResult} props.prediction - The crime prediction data to be displayed
 *
 * @returns A card displaying:
 * - Top 3 predicted crime types with their probabilities
 * - Location details including street name and location type
 * - Model version information
 *
 * @example
 * ```tsx
 * <PredictionCard prediction={crimePredictionData} />
 * ```
 */
import React from "react";
import { View, Text, Image } from "react-native";
import { CrimePredictionResult } from "../../services/fetchCrimePredictions";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { labels } from "@/constants/labels";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";

interface Props {
  prediction: CrimePredictionResult;
}

const PredictionCard: React.FC<Props> = ({ prediction }) => {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl mx-4 mt-6 px-4 py-5 shadow-md">
      <Text className="text-xl font-bold text-primary mb-8">
        {labels.crimeTypes}
      </Text>
      {prediction.top_3_predicted_crime_types.map((crime, index) => (
        <View key={crime} className="flex-row items-center mb-3">
          <Image
            source={
              images[
                crime.toLowerCase().replace(/\s+/g, "-") as keyof typeof images
              ] ||
              Object.entries(images).find(([key]) =>
                crime.toLowerCase().includes(key.replace(/-/g, " "))
              )?.[1]
            }
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text className="ml-2 text-xl font-semibold text-black">
            {crime}
            <Text className="text-gray-500 font-normal">
              {" "}
              ({(prediction.probabilities[crime] * 100).toFixed(1)}%)
            </Text>
          </Text>
        </View>
      ))}
      {/*Location details*/}
      <View className="mt-6 space-y-2">
        <View className="flex-row items-center">
          <Feather name="map-pin" size={26} color="#2B6CB0" />
          <Text className="ml-3 text-[16px] text-gray-800 font-medium">
            {prediction.location_features.street_name}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-gray-400 mt-4">
        Model version: {prediction.model_version}
      </Text>
    </View>
  );
};

export default PredictionCard;
