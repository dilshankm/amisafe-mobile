/**
 * Custom React hook to fetch and manage nearby current crimes based on the user's location.
 *
 * This hook retrieves the user's personal information and crime alert preferences from the Redux store,
 * and fetches nearby crimes using the provided latitude and longitude. It manages loading and error states,
 * and provides a method to manually refetch the crimes.
 *
 * @param latitude - The latitude coordinate to search for nearby crimes. If null, fetching is skipped.
 * @param longitude - The longitude coordinate to search for nearby crimes. If null, fetching is skipped.
 * @returns An object containing:
 *   - `crimes`: Array of nearby crimes (`Crime[]`).
 *   - `loading`: Boolean indicating if the crimes are being loaded.
 *   - `error`: Error message if fetching fails, otherwise `null`.
 *   - `user`: Object with user details and alert preferences.
 *   - `locationCoords`: Object with the current latitude and longitude.
 *   - `refetchCrimes`: Function to manually refetch the nearby crimes.
 *
 * @example
 * const { crimes, loading, error, user, locationCoords, refetchCrimes } = useNearbyCurrentCrimes(lat, lng);
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNearbyCrimes, Crime } from "@/services/crimeService";
import { MESSAGES } from "../utils/errorMessages";

export const useNearbyCurrentCrimes = (
  latitude: number | null,
  longitude: number | null
) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get values from Redux
  const { locationCoords, crimeAlerts, name, dob, mobile, postalCode } =
    useSelector((state: RootState) => state.auth.personalInfo);

  const alertRadius = crimeAlerts?.alertRadius || "1";
  useEffect(() => {
    if (latitude == null || longitude == null) return;
    const loadCrimes = async () => {
      setLoading(true);
      setError(null);
      const result = await fetchNearbyCrimes(
        latitude,
        longitude,
        Number(alertRadius)
      );
      if (result.success && result.data) {
        setCrimes(result.data);
      } else {
        setError(result.message || MESSAGES.FAILED_TO_LOAD_CRIMES);
      }
      setLoading(false);
    };
    loadCrimes();
  }, [latitude, longitude, alertRadius]);

  // refetch crimes function
  // This function can be called to manually refetch the crimes
  const refetchCrimes = async () => {
    if (latitude == null || longitude == null) return;
    setLoading(true);
    setError(null);
    const result = await fetchNearbyCrimes(
      latitude,
      longitude,
      Number(alertRadius)
    );
    if (result.success && result.data) {
      setCrimes(result.data);
    } else {
      setError(result.message || MESSAGES.FAILED_TO_LOAD_CRIMES);
    }
    setLoading(false);
  };

  // Refetch crimes when latitude, longitude, or alertRadius changes
  useEffect(() => {
    refetchCrimes();
  }, [latitude, longitude, alertRadius]);

  return {
    crimes,
    loading,
    error,
    user: {
      name,
      dob,
      mobile,
      postalCode,
      emailEnabled: crimeAlerts?.emailEnabled || false,
      pushEnabled: crimeAlerts?.pushEnabled || false,
      alertRadius,
    },
    locationCoords: {
      latitude,
      longitude,
    },
    refetchCrimes,
  };
};
