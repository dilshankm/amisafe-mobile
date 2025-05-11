import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchCrimePrediction,
  CrimePredictionResult,
} from "../services/fetchCrimePredictions";
import { MESSAGES } from "../utils/errorMessages";

/**
 * Custom React hook to fetch and manage crime prediction based on user's location and month.
 *
 * @param latitude - The latitude coordinate for prediction.
 * @param longitude - The longitude coordinate for prediction.
 * @param month - The prediction month in "YYYY-MM" format.
 *
 * @returns An object containing:
 *   - `prediction`: The prediction result.
 *   - `loading`: Boolean indicating if the prediction is loading.
 *   - `error`: Error message if failed, otherwise null.
 *   - `user`: Personal info from Redux.
 *   - `locationCoords`: The coordinates passed in.
 *   - `refetchPrediction`: Function to manually re-trigger the prediction.
 */
export const useCrimePrediction = (
  latitude: number | null,
  longitude: number | null,
  month: string
) => {
  const [prediction, setPrediction] = useState<CrimePredictionResult | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { locationCoords, crimeAlerts, name, dob, mobile, postalCode } =
    useSelector((state: RootState) => state.auth.personalInfo);

  const loadPrediction = async () => {
    if (latitude == null || longitude == null || !month) return;
    setLoading(true);
    setError(null);

    const result = await fetchCrimePrediction(latitude, longitude, month);

    if (result.success && result.data) {
      setPrediction(result.data);
    } else {
      setError(result.message || MESSAGES.SOMETHING_WENT_WRONG);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPrediction();
  }, [latitude, longitude, month]);

  const refetchPrediction = () => {
    loadPrediction();
  };

  return {
    prediction,
    loading,
    error,
    user: {
      name,
      dob,
      mobile,
      postalCode,
      emailEnabled: crimeAlerts?.emailEnabled || false,
      pushEnabled: crimeAlerts?.pushEnabled || false,
      alertRadius: crimeAlerts?.alertRadius || "1",
    },
    locationCoords: {
      latitude,
      longitude,
    },
    refetchPrediction,
  };
};
