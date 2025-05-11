/**
 * Custom React hook to fetch and manage nearby crime data based on provided or stored coordinates.
 *
 * This hook retrieves the user's personal information and crime alert preferences from the Redux store,
 * determines the appropriate latitude and longitude to use (either from arguments or Redux state),
 * and fetches nearby crimes using the `fetchNearbyCrimes` service.
 *
 * @param lati - The latitude to use for fetching crimes. If null, falls back to Redux state.
 * @param long - The longitude to use for fetching crimes. If null, falls back to Redux state.
 * @returns An object containing:
 *  - `crimes`: Array of nearby crimes.
 *  - `loading`: Boolean indicating if the data is being loaded.
 *  - `error`: Error message if fetching fails, otherwise null.
 *  - `user`: Object with user personal info and alert preferences.
 *  - `locationCoords`: Object with the latitude and longitude used for the query.
 *
 * @remarks
 * The hook automatically updates when the coordinates or alert radius change.
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNearbyCrimes, Crime } from "@/services/crimeService";
import { MESSAGES } from "../utils/errorMessages";

export const useNearbyCrimes = (lati: number | null, long: number | null) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Get values from Redux
  const { locationCoords, crimeAlerts, name, dob, mobile, postalCode } =
    useSelector((state: RootState) => state.auth.personalInfo);
  const alertRadius = crimeAlerts?.alertRadius || "1";

  // ✅ Decide which coordinates to use
  const latitude = lati ?? locationCoords?.latitude;
  const longitude = long ?? locationCoords?.longitude;

  // ✅ Check if coordinates are available
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
        setCrimes([]);
        setError(result.message || MESSAGES.FAILED_TO_LOAD_CRIMES);
      }
      setLoading(false);
    };
    loadCrimes();
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
  };
};
