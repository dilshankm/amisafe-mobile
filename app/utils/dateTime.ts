/**
 * Utils module for date and time related operations
 */

/**
 * Returns a time-based greeting based on the current hour of the day
 * @returns {string} A greeting message based on the time of day:
 * - "Good Morning" for hours 0-11
 * - "Good Afternoon" for hours 12-16
 * - "Good Evening" for hours 17-20
 * - "Good Night" for hours 21-23
 */

/**
 * Converts a date string from YYYY-MM format to a more readable "YYYY Month" format
 * @param {string} s - Date string in "YYYY-MM" format (e.g., "2023-12")
 * @returns {string} Formatted date string with full month name (e.g., "2023 December")
 * @example
 * getYearAndMonthBasedOnNumbers("2023-12") // returns "2023 December"
 */
import { MESSAGES } from "./errorMessages";
import { MONTHS } from "@/constants/dateConstants";

// Constants for greeting messages
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return MESSAGES.GOOD_MORNING;
  if (hour < 17) return MESSAGES.GOOD_AFTERNOON;
  if (hour < 21) return MESSAGES.GOOD_EVENING;
  return MESSAGES.GOOD_NIGHT;
}

// Converts a date string from YYYY-MM format to a more readable "YYYY Month" format
export function getYearAndMonthBasedOnNumbers(s: string): string {
  return s.replace(/(\d{4})-(\d{2})/, (_, y, m) => `${y} ${MONTHS[+m - 1]}`);
}
