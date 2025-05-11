// This file contains the options for the alert radius dropdown in the AlertForm component.
// It exports an array of objects, each containing a label and value for the dropdown options.
// The options are used to set the radius for crime alerts in the application.
// The options are defined in miles, ranging from 1 to 20 miles
export interface RadiusOption {
  label: string;
  value: string;
}

export const alertRadiusOptions: RadiusOption[] = [
  { label: "1 mile", value: "1" },
  { label: "5 miles", value: "5" },
  { label: "10 miles", value: "10" },
  { label: "20 miles", value: "20" },
];
