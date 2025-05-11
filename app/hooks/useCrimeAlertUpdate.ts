/**
 * Custom React hook to handle updating crime alert preferences and user location information
 * when navigating away from a screen. This hook listens for the `beforeRemove` navigation event,
 * validates and updates the user's postal code and coordinates, updates Redux state, and persists
 * changes to the backend via `updateUserByEmail`.
 *
 * @param values - An object containing the user's crime alert preferences and postal code:
 *   - `emailEnabled`: Whether email alerts are enabled.
 *   - `pushEnabled`: Whether push notifications are enabled.
 *   - `alertRadius`: The radius (as a string) for receiving alerts.
 *   - `postalCode`: The user's postal code.
 * @param postalCodeError - An optional string representing a validation error for the postal code.
 *
 * @remarks
 * - Updates Redux state with new personal info and crime alert preferences.
 * - Persists changes to the backend if the email and location are available.
 * - Validates the postal code before updating.
 * - Fetches new coordinates if the postal code has changed.
 *
 * @example
 * useCrimeAlertUpdate(formValues, postalCodeError);
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalInfoAction } from "@/store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { updateUserByEmail } from "@/services/userService";
import { RootState } from "@/store/store";
import { getCoordinatesFromPostal } from "../services/getCoordinatesFromPostal";
import { PostalCodeSchema } from "@/utils/validators";

export const useCrimeAlertUpdate = (
  values: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    alertRadius: string;
    postalCode: string;
  },
  postalCodeError: string | undefined
) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { email, personalInfo } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      const previousPostalCode = personalInfo.postalCode;
      const hasPostalChanged = previousPostalCode !== values.postalCode;
      let finalPostalCode = values.postalCode;
      let finalCoords = personalInfo.locationCoords;
      // If the postal code has changed, fetch new coordinates
      // and validate the new postal code
      if (hasPostalChanged) {
        const coords = await getCoordinatesFromPostal(values.postalCode);
        if (coords) {
          finalCoords = {
            latitude: coords.latitude ?? 0,
            longitude: coords.longitude ?? 0,
          };
        } else {
          console.warn("Failed to get coordinates for new postal code");
        }
      }
      const isValid = await PostalCodeSchema.isValid({
        postalCode: values.postalCode,
      });
      if (isValid) {
        finalPostalCode = values.postalCode;
      } else {
        finalPostalCode = previousPostalCode ?? "";
      }
      // ✅ Update Redux
      dispatch(
        setPersonalInfoAction({
          postalCode: finalPostalCode,
          locationCoords: finalCoords,
          crimeAlerts: {
            emailEnabled: values.emailEnabled,
            pushEnabled: values.pushEnabled,
            alertRadius: values.alertRadius,
          },
        })
      );
      // update the user in the backend
      if (email && personalInfo.locationCoords) {
        const updatePayload = {
          email,
          name: personalInfo.name ?? "",
          mobile: personalInfo.mobile ?? "",
          dob: personalInfo.dob ?? "",
          currentLocation: {
            latitude: (finalCoords?.latitude ?? 0).toString(),
            longitude: (finalCoords?.longitude ?? 0).toString(),
            street: {
              id: null,
              name: finalPostalCode,
            },
          },
          preferences: {
            alertRadius: Number(values.alertRadius),
            emailNotifications: values.emailEnabled,
            pushNotifications: values.pushEnabled,
          },
        };
        await updateUserByEmail(email, updatePayload);
      } else {
        console.warn("Missing email or location — update skipped.");
      }
    });

    return unsubscribe;
  }, [values, dispatch, navigation]);
};
