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
import React, { useMemo, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import Maps from "../components/common/Maps";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useNearbyCurrentCrimes } from "../hooks/useNearByCurrentCrimes";
import {
  getTimeBasedGreeting,
  getYearAndMonthBasedOnNumbers,
} from "../utils/dateTime";
import { MESSAGES } from "@/utils/errorMessages";
import { getCrimeIcon } from "@/utils/crimeIconMapper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoader from "@/components/common/AppLoader";
import { useFocusEffect } from "@react-navigation/native";
import NoCrimesBanner from "@/components/common/NoCrimesBanner";

const Index = () => {
  const { location, errorMsg } = useCurrentLocation();
  const {
    crimes,
    loading: crimesLoading,
    error: crimesError,
    user: { name, postalCode, alertRadius, emailEnabled, pushEnabled },
    refetchCrimes,
  } = useNearbyCurrentCrimes(
    location?.latitude ?? null,
    location?.longitude ?? null
  );
  //Store last known state
  const lastParamsRef = useRef({
    lat: location?.latitude,
    lng: location?.longitude,
    radius: alertRadius,
  });
  // Refetch when returning to tab if values changed
  useFocusEffect(
    useCallback(() => {
      const latChanged = lastParamsRef.current.lat !== location?.latitude;
      const lngChanged = lastParamsRef.current.lng !== location?.longitude;
      const radiusChanged = lastParamsRef.current.radius !== alertRadius;
      if (latChanged || lngChanged || radiusChanged) {
        lastParamsRef.current = {
          lat: location?.latitude,
          lng: location?.longitude,
          radius: alertRadius,
        };
        refetchCrimes();
      }
    }, [location?.latitude, location?.longitude, alertRadius])
  );
  // Refetch when location changes
  const memoizedMarkers = useMemo(() => {
    if (!crimes) return [];
    return crimes.map((crime) => ({
      id: crime.id,
      latitude: parseFloat(crime.location.latitude),
      longitude: parseFloat(crime.location.longitude),
      title: crime.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      location: crime.location.street.name,
      outcomeStatus: crime.outcome_status?.category ?? "",
      date: getYearAndMonthBasedOnNumbers(crime.month),
      image: getCrimeIcon(crime.category),
      category: crime.category,
    }));
  }, [crimes]);

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
      {/* Greeting + crime status */}
      <View className="px-4 pt-1 space-y-1">
        <Text className="text-xl font-semibold text-primary">
          {getTimeBasedGreeting()}, {name} !!
        </Text>
        <Text className="text-base text-primary">{MESSAGES.STAY_INFORMED}</Text>
      </View>

      {/* Map with crime markers */}
      <View className="flex-1 w-full overflow-hidden mt-4">
        {crimesLoading ? (
          <AppLoader />
        ) : (
          <View className="flex-1">
            <Maps
              lat={location?.latitude ?? 0}
              lng={location?.longitude ?? 0}
              markers={memoizedMarkers}
              radius={alertRadius}
            />
            {Array.isArray(crimes) && crimes.length === 0 && <NoCrimesBanner />}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;
