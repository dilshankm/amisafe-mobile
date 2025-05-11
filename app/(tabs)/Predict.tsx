/**
 * Main tab screen component displaying a personalized greeting, a map with nearby crime markers,
 * and relevant user information. Handles fetching the user's current location and nearby crimes,
 * and updates the map markers accordingly. Also manages loading and error states, and refetches
 * crime data when the user returns to the tab if location or alert radius has changed.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered home tab screen with map and crime data.
 *
 * @remarks
 * - Uses `useCurrentLocation` to get the user's geolocation.
 * - Uses `useNearbyCurrentCrimes` to fetch crimes near the user's location.
 * - Refetches crimes when location or alert radius changes upon tab focus.
 * - Displays a loader while fetching data, and handles error states.
 * - Shows a map with markers for each nearby crime, and a banner if no crimes are found.
 */
import React, { useRef } from "react";
import { View, Text } from "react-native";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getTimeBasedGreeting } from "../utils/dateTime";
import { MESSAGES } from "@/utils/errorMessages";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoader from "@/components/common/AppLoader";
import { useCrimePrediction } from "@/hooks/useCrimePrediction";
import PredictionCard from "@/components/common/PredictionCard";

const Predict = () => {
  const { location, errorMsg } = useCurrentLocation();
  const {
    prediction,
    loading: predictionLoading,
    error: predictionError,
    user: { name, postalCode, alertRadius, emailEnabled, pushEnabled },
    refetchPrediction,
  } = useCrimePrediction(
    location?.latitude ?? null,
    location?.longitude ?? null,
    new Date().toISOString().slice(0, 7)
  );

  //Store last known state
  const lastParamsRef = useRef({
    lat: location?.latitude,
    lng: location?.longitude,
    radius: alertRadius,
  });

  if (!location && !errorMsg) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <AppLoader />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">{errorMsg}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
      <View className="px-4 pt-1 space-y-1">
        <Text className="text-xl font-semibold text-primary">
          {getTimeBasedGreeting()}, {name} !!
        </Text>
        <Text className="text-base text-primary mt-1">
          {MESSAGES.CRIME_PREDICTION_BETA_NOTICE}
        </Text>
      </View>

      <View className="flex-1 w-full overflow-hidden mt-4">
        {predictionLoading ? (
          <AppLoader />
        ) : prediction ? (
          <PredictionCard prediction={prediction} />
        ) : predictionError ? (
          <Text className="text-center text-red-500 mt-4">
            {predictionError}
          </Text>
        ) : (
          <Text className="text-base text-primary mt-1">
            {MESSAGES.NO_CRIME_PREDICTION_NOTICE}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Predict;
