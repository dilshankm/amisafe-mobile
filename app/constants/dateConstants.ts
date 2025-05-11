/**
 * Array of month names in English.
 * @constant
 * @type {readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
 */

/**
 * Type representing a month name.
 * @type {(typeof MONTHS)[number]}
 */
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Month = (typeof MONTHS)[number];
