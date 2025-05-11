/**
 * HomeCrimeMap component displays a map with nearby crime markers and user-specific information.
 *
 * - Fetches nearby crimes and user details using the `useNearbyCrimes` hook.
 * - Shows a personalized greeting and the user's postal code.
 * - Renders a map with markers for each crime, including category, location, date, and outcome.
 * - Displays a loading indicator while fetching data or if location is not yet available.
 * - Shows a banner if there are no crimes in the area.
 *
 * @component
 * @returns {JSX.Element} The rendered HomeCrimeMap component.
 */
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Maps from "../components/common/Maps";
import { useNearbyCrimes } from "@/hooks/useNearbyCrimes";
import {
  getTimeBasedGreeting,
  getYearAndMonthBasedOnNumbers,
} from "../utils/dateTime";
import { MESSAGES } from "@/utils/errorMessages";
import { getCrimeIcon } from "@/utils/crimeIconMapper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoader from "@/components/common/AppLoader";
import NoCrimesBanner from "@/components/common/NoCrimesBanner";

const HomeCrimeMap = () => {
  const {
    crimes,
    loading: crimesLoading,
    error: crimesError,
    user: { name, postalCode, alertRadius, emailEnabled },
    locationCoords,
  } = useNearbyCrimes(null, null);

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

  if (!locationCoords && !crimesError) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <AppLoader />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
      {/* Greeting + crime status */}
      <View className="px-4 pt-1 space-y-1">
        <Text className="text-xl font-semibold text-primary">
          {getTimeBasedGreeting()}, {name}
        </Text>
        <Text className="text-base text-primary">
          {MESSAGES.CRIME_STATUS_AT} {postalCode}
        </Text>
      </View>

      {/* Map with crime markers */}
      <View className="flex-1 w-full overflow-hidden mt-4">
        {crimesLoading ? (
          <AppLoader />
        ) : (
          <View className="flex-1">
            <Maps
              lat={locationCoords?.latitude ?? 0}
              lng={locationCoords?.longitude ?? 0}
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

export default HomeCrimeMap;
