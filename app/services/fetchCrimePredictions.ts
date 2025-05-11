/**
 * Sends coordinates and month to predict the most likely crime type.
 *
 * @param latitude - The latitude of the location to predict crime for.
 * @param longitude - The longitude of the location to predict crime for.
 * @param month - The month in YYYY-MM format (e.g., "2025-05").
 * @returns A promise that resolves to an object containing:
 *   - `success`: Whether the request was successful.
 *   - `data`: The prediction result (if successful).
 *   - `message`: An error message (if unsuccessful).
 */
import { apiConfig } from "@/config/apiConfig";
import { MESSAGES } from "../utils/errorMessages";
export interface CrimePredictionResult {
  predicted_crime_type: string;
  top_3_predicted_crime_types: string[];
  probabilities: Record<string, number>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location_features: {
    location_type: string;
    outcome_status: string;
    street_name: string;
  };
  model_version: string;
}

export const fetchCrimePrediction = async (
  latitude: number,
  longitude: number,
  month: string
): Promise<{
  success: boolean;
  data?: CrimePredictionResult;
  message?: string;
}> => {
  try {
    console.log(latitude, longitude, month);
    const url = `http://127.0.0.1:5000/predict`;
    console.log("Sending prediction request to:", url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": apiConfig.headers.contentType,
        "Access-Control-Allow-Origin":
          apiConfig.headers.accessControlAllowOrigin,
        mode: "no-cors",
      },
      body: JSON.stringify({ latitude, longitude, month }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json?.error || MESSAGES.SOMETHING_WENT_WRONG,
      };
    }

    return {
      success: true,
      data: json as CrimePredictionResult,
    };
  } catch (err) {
    console.log("fetchCrimePrediction Error:", err);
    return {
      success: false,
      message: MESSAGES.SERVER_ERROR,
    };
  }
};
