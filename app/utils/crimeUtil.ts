/**
 * Assigns colors to crime markers based on their category and removes duplicates.
 *
 * @param crimes - Array of crime markers to process
 * @returns Array of crime markers with assigned pin colors, with duplicates removed
 *
 * @interface CrimeMarker - Represents a crime incident on the map
 * @property {string} id - Unique identifier for the crime
 * @property {number} latitude - Geographic latitude of the crime location
 * @property {number} longitude - Geographic longitude of the crime location
 * @property {string} title - Title or description of the crime
 * @property {string} location - Location description of the crime
 * @property {string} outcomeStatus - Status or outcome of the crime investigation
 * @property {string} date - Date when the crime occurred
 * @property {ImageSourcePropType} image - Image associated with the crime type
 * @property {string} category - Category or type of the crime
 *
 * @interface CrimeMarkerWithColor - Extends CrimeMarker with pin color
 * @property {string} pinColor - Color assigned to the crime marker based on its category
 */
import { ImageSourcePropType } from "react-native";
import { crimeTypeToColor } from "./crimeTypeToColor";

export interface CrimeMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  location: string;
  outcomeStatus: string;
  date: string;
  image: ImageSourcePropType;
  category: string;
}

export interface CrimeMarkerWithColor extends CrimeMarker {
  pinColor: string;
}
/// Map of crime types to their corresponding colors
export function assignColorsToCrimeMarkers(
  crimes: CrimeMarker[]
): CrimeMarkerWithColor[] {
  const seenIds = new Set<string>();
  const uniqueCrimes: CrimeMarker[] = [];

  for (const crime of crimes) {
    if (!seenIds.has(crime.id)) {
      seenIds.add(crime.id);
      uniqueCrimes.push(crime);
    }
  }

  return uniqueCrimes.map((crime) => ({
    ...crime,
    pinColor: crimeTypeToColor[crime.category],
  }));
}
