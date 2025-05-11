/**
 * Custom React hook to retrieve the user's current geographic location and UK postal code using Expo Location.
 *
 * This hook requests foreground location permissions, fetches the user's current latitude and longitude,
 * and attempts to reverse geocode the coordinates to obtain the postal code (if available).
 *
 * @returns An object containing:
 * - `location`: The user's current location as an object with `latitude`, `longitude`, and optional `postalCode`, or `null` if unavailable.
 * - `errorMsg`: A string describing any error encountered, or `null` if no error occurred.
 *
 * @example
 * const { location, errorMsg } = useCurrentLocation();
 * if (location) {
 *   console.log(location.latitude, location.longitude, location.postalCode);
 * }
 * if (errorMsg) {
 *   console.error(errorMsg);
 * }
 */
//
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MESSAGES } from "../utils/errorMessages";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    postalCode?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(MESSAGES.LOCATION_PERMISSION_DENIED);
        return;
      }
      try {
        // Get current position
        const position = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = position.coords;
        // Reverse geocode for UK postal code
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const ukPostalCode = address[0]?.postalCode || null;
        // Set location state
        setLocation({
          latitude,
          longitude,
          postalCode: ukPostalCode ?? undefined,
        });
      } catch (error) {
        setErrorMsg(MESSAGES.LOCATION_FETCH_FAILED);
      }
    })();
  }, []);

  return { location, errorMsg };
};
