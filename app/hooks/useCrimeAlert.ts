/**
 * Custom React hook for handling crime alert settings and user creation.
 *
 * This hook provides a `handleFinish` callback that:
 * - Updates the Redux store with the user's crime alert preferences.
 * - Logs the updated personal information.
 * - Constructs a payload with user details and preferences.
 * - Calls the `createUser` service to insert or update the user in the backend.
 * - Navigates to the main tabs screen upon completion.
 *
 * @returns An object containing the `handleFinish` function to be used in forms or components.
 *
 * @example
 * const { handleFinish } = useCrimeAlert();
 * // Use handleFinish as a form submission handler
 */
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { router } from "expo-router";
import { setPersonalInfoAction } from "../store/authSlice";
import { RootState } from "../store/store"; // adjust path if needed
import { createUser } from "@/services/userService";

type CrimeAlertSettings = {
  emailEnabled: boolean;
  pushEnabled: boolean;
  alertRadius: string;
};

export const useCrimeAlert = () => {
  const dispatch = useDispatch();
  const { email, personalInfo } = useSelector((state: RootState) => state.auth);

  // Function to handle form submission
  const handleFinish = useCallback(
    async (values: CrimeAlertSettings) => {
      // Update Redux store with new crime alert settings
      dispatch(
        setPersonalInfoAction({
          crimeAlerts: {
            emailEnabled: values.emailEnabled,
            pushEnabled: values.pushEnabled,
            alertRadius: values.alertRadius,
          },
        })
      );

      // Print full updated personalInfo
      setTimeout(() => {
        console.log("Updated personalInfo in store:", {
          ...personalInfo,
          crimeAlerts: values,
        });
      }, 0);

      // Construct payload for user creation
      // Ensure locationCoords is defined before accessing its properties
      const payload = {
        email: email,
        name: personalInfo.name!,
        mobile: personalInfo.mobile!,
        dob: personalInfo.dob!,
        currentLocation: {
          latitude: personalInfo.locationCoords?.latitude.toString() || "",
          longitude: personalInfo.locationCoords?.longitude.toString() || "",
          street: {
            name: personalInfo.postalCode || "Unknown",
          },
        },
        preferences: {
          alertRadius: parseInt(values.alertRadius, 10),
          emailNotifications: values.emailEnabled,
          pushNotifications: values.pushEnabled,
        },
      };

      // Insert user
      const res = await createUser(payload);
      console.log("User creation result:", res);
      router.push("/(tabs)");
    },
    [dispatch, personalInfo]
  );

  return { handleFinish };
};
