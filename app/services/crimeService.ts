import { apiConfig } from "../config/apiConfig";
import { MESSAGES } from "../utils/errorMessages";

/**
 * Fetches nearby crimes based on the provided latitude, longitude, and optional radius.
 *
 * The function queries a remote API for crimes near the specified location, groups the results
 * by crime category (trimming whitespace), and returns up to two crimes per category.
 *
 * @param latitude - The latitude of the location to search nearby crimes for.
 * @param longitude - The longitude of the location to search nearby crimes for.
 * @param radius - The search radius in kilometers (default is 1).
 * @returns A promise that resolves to an object containing:
 *   - `success`: Whether the fetch was successful.
 *   - `data`: An array of up to two crimes per category (if successful).
 *   - `message`: An error message (if unsuccessful).
 */
export interface Crime {
  [x: string]: any;
  id: string;
  category: string;
  context: string;
  month: string;
  location: {
    latitude: string;
    longitude: string;
    street: {
      id: string;
      name: string;
    };
  };
  persistent_id: string;
  location_subtype: string;
  location_type: string;
  outcome_status: null | {
    category: string;
    date: string;
  };
}
// @param latitude - The latitude of the location to search nearby crimes for.
// @param longitude - The longitude of the location to search nearby crimes for.
// @param radius - The search radius in kilometers (default is 1).
// @returns A promise that resolves to an object containing:
//   - `success`: Whether the fetch was successful.
//   - `data`: An array of up to two crimes per category (if successful).
//   - `message`: An error message (if unsuccessful).
export const fetchNearbyCrimes = async (
  latitude: number,
  longitude: number,
  radius: number = 1
): Promise<{ success: boolean; data?: Crime[]; message?: string }> => {
  try {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.crimes.nearby}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    console.log("Fetching nearby crimes..." + url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": apiConfig.headers.contentType,
        "Access-Control-Allow-Origin":
          apiConfig.headers.accessControlAllowOrigin,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json?.message || MESSAGES.SOMETHING_WENT_WRONG,
      };
    }
    const MAX_PER_CATEGORY = 2;
    const categoryMap: Record<string, Crime[]> = {};
    // Group crimes by trimmed category
    (json as Crime[]).forEach((crime) => {
      const category = crime.category.trim();
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(crime);
    });
    const filtered: Crime[] = [];
    // Take up to MAX_PER_CATEGORY from each category group
    for (const category in categoryMap) {
      filtered.push(...categoryMap[category].slice(0, MAX_PER_CATEGORY));
    }
    return { success: true, data: filtered };
  } catch (err) {
    console.log("FetchNearbyCrimes Error:", err);
    return { success: false, message: MESSAGES.SERVER_ERROR };
  }
};
