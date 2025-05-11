/**
 * An object containing the color palette used throughout the application.
 *
 * @property {string} primary - The main brand color.
 * @property {string} secondary - The secondary brand color with alpha transparency.
 * @property {string} blue - A lighter blue accent color.
 * @property {string} grey - Standard grey used for text or backgrounds.
 * @property {string} red - Used for errors or warnings.
 * @property {object} light - Shades of light colors.
 * @property {string} light.100 - Lightest shade.
 * @property {string} light.200 - Medium light shade.
 * @property {string} light.300 - Darkest light shade.
 * @property {object} dark - Shades of dark colors.
 * @property {string} dark.100 - Lightest dark shade.
 * @property {string} dark.200 - Darkest dark shade.
 * @property {string} accent - Accent color for highlights or special elements.
 */
export const colors = {
  primary: "#1D70B8",
  secondary: "#79BEF921",
  blue: "#79BEF9",
  grey: "#4A4A4A",
  red: "#B71C1C",
  light: {
    100: "#D6C7FF",
    200: "#A8B5DB",
    300: "#9CA4AB",
  },
  dark: {
    100: "#221F3D",
    200: "#0F0D23",
  },
  accent: "#AB8BFF",
} as const;
