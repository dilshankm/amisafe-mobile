/**
 * A mapping of crime types to their corresponding color codes in hexadecimal format.
 *
 * @property {'violent-crime'} [key] - Red color (#e74c3c) for violent crimes
 * @property {'vehicle-crime'} [key] - Dark orange color (#d35400) for vehicle crimes
 * @property {'public-order'} [key] - Teal color (#16a085) for public order offenses
 * @property {'criminal-damage-arson'} [key] - Dark red color (#c0392b) for criminal damage and arson
 * @property {'other-crime'} [key] - Dark blue-grey color (#34495e) for other crimes
 * @property {'theft-from-the-person'} [key] - Green color (#27ae60) for personal theft
 * @property {'possession-of-weapons'} [key] - Purple color (#9b59b6) for weapon possession
 * @property {'anti-social-behaviour'} [key] - Grey color (#7f8c8d) for anti-social behavior
 * @property {'misc-crime'} [key] - Pink color (#fd79a8) for miscellaneous crimes
 * @property {'miscellaneous-crime'} [key] - Cyan color (#00cec9) for miscellaneous crimes
 * @property {'crminal-damage-and-arson'} [key] - Bright red color (#d63031) for criminal damage and arson
 * @property {'bicycle-theft'} [key] - Orange color (#e67e22) for bicycle theft
 * @property {'bike-theft'} [key] - Yellow color (#f1c40f) for bike theft
 * @property {'burglary'} [key] - Blue color (#2980b9) for burglary
 * @property {'shoplifting'} [key] - Light green color (#1abc9c) for shoplifting
 * @property {'arson'} [key] - Pink color (#e84393) for arson
 * @property {'order'} [key] - Purple color (#6c5ce7) for order-related crimes
 * @property {'fraud'} [key] - Light orange color (#fdcb6e) for fraud
 * @property {'weapons'} [key] - Blue color (#0984e3) for weapons-related crimes
 * @property {'robbery'} [key] - Orange color (#f39c12) for robbery
 * @property {'theft'} [key] - Green color (#2ecc71) for theft
 * @property {'drugs'} [key] - Purple color (#8e44ad) for drug-related crimes
 * @property {'other-theft'} [key] - Dark grey color (#2d3436) for other types of theft
 */
export const crimeTypeToColor: { [key: string]: string } = {
  "violent-crime": "#e74c3c",
  "vehicle-crime": "#d35400",
  "public-order": "#16a085",
  "criminal-damage-arson": "#c0392b",
  "other-crime": "#34495e",
  "theft-from-the-person": "#27ae60",
  "possession-of-weapons": "#9b59b6",
  "anti-social-behaviour": "#7f8c8d",
  "misc-crime": "#fd79a8",
  "miscellaneous-crime": "#00cec9",
  "crminal-damage-and-arson": "#d63031",
  "bicycle-theft": "#e67e22",
  "bike-theft": "#f1c40f",
  burglary: "#2980b9",
  shoplifting: "#1abc9c",
  arson: "#e84393",
  order: "#6c5ce7",
  fraud: "#fdcb6e",
  weapons: "#0984e3",
  robbery: "#f39c12",
  theft: "#2ecc71",
  drugs: "#8e44ad",
  "other-theft": "#2d3436",
};
