import { apiConfig, API_URLS, API_ENDPOINTS } from "../config/apiConfig";
import { MESSAGES } from "../utils/errorMessages";

/**
 * Retrieves the geographical coordinates (latitude and longitude) for a given UK postal code
 * using the postcodes.io API.
 *
 * @param postalCode - The UK postal code to look up.
 * @returns A promise that resolves to an object containing:
 *   - `success`: Indicates if the lookup was successful.
 *   - `latitude`: The latitude of the postal code (if successful).
 *   - `longitude`: The longitude of the postal code (if successful).
 *   - `message`: An error message if the lookup was unsuccessful.
 *
 * @example
 * ```typescript
 * const result = await getCoordinatesFromPostal("SW1A 1AA");
 * if (result.success) {
 *   console.log(result.latitude, result.longitude);
 * } else {
 *   console.error(result.message);
 * }
 * ```
 */
export const getCoordinatesFromPostal = async (
  postalCode: string
): Promise<{
  success: boolean;
  latitude?: number;
  longitude?: number;
  message?: string;
}> => {
  try {
    const url = `${API_URLS.postcodesIO}${
      API_ENDPOINTS.postcodes.lookup
    }/${encodeURIComponent(postalCode)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (res.ok && json.result) {
      return {
        success: true,
        latitude: json.result.latitude,
        longitude: json.result.longitude,
      };
    } else {
      return {
        success: false,
        message: json.error || MESSAGES.COORDINATES_FETCH_ERROR,
      };
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return {
      success: false,
      message: MESSAGES.COORDINATES_SERVER_ERROR,
    };
  }
};
