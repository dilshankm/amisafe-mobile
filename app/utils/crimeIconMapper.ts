/**
 * Maps crime types to their corresponding icon images.
 * If a crime type is not found in the mapping, returns a default 'other-crime' icon.
 *
 * @param {string} type - The type of crime to get an icon for
 * @returns {any} The icon image corresponding to the crime type
 *
 * @example
 * ```typescript
 * const icon = getCrimeIcon('burglary');
 * // Returns the burglary icon image
 *
 * const icon = getCrimeIcon('unknown-crime');
 * // Returns the default 'other-crime' icon image
 * ```
 */
import { images } from "@/constants/images";

const crimeTypeToIcon: { [key: string]: any } = {
  "violent-crime": images["violent-crime"],
  "vehicle-crime": images["vehicle-crime"],
  "public-order": images["public-order"],
  "criminal-damage-arson": images["criminal-damage-arson"],
  "other-crime": images["other-crime"],
  "theft-from-the-person": images["theft-from-the-person"],
  "possession-of-weapons": images["possession-of-weapons"],
  "anti-social-behaviour": images["anti-social-behaviour"],
  "misc-crime": images["misc-crime"],
  "miscellaneous-crime": images["miscellaneous-crime"],
  "crminal-damage-and-arson": images["crminal-damage-and-arson"],
  "bicycle-theft": images["bicycle-theft"],
  "bike-theft": images["bike-theft"],
  burglary: images.burglary,
  shoplifting: images.shoplifting,
  arson: images.arson,
  order: images.order,
  fraud: images.fraud,
  weapons: images.weapons,
  robbery: images.robbery,
  theft: images.theft,
  drugs: images.drugs,
  "other-theft": images["other-crime"],
};

export const getCrimeIcon = (type: string) => {
  return crimeTypeToIcon[type] || images["other-crime"];
};
