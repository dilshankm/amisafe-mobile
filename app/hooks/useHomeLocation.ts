/**
 * Custom hook to handle setting the user's home location based on a postal code.
 *
 * This hook provides a function, `handlePostalCode`, which:
 * - Accepts an object containing a `postalCode` string.
 * - Fetches geographic coordinates (latitude and longitude) for the given postal code.
 * - Dispatches actions to update the user's personal information in the Redux store,
 *   including location coordinates and enabling location.
 * - Logs the result or warns if coordinates could not be fetched.
 * - Always updates the postal code in the Redux store.
 * - Navigates the user to the "/(auth)/CrimeAlert" route.
 *
 * @returns An object containing the `handlePostalCode` callback function.
 */
import { router } from "expo-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPersonalInfoAction } from "../store/authSlice";
import { getCoordinatesFromPostal } from "../services/getCoordinatesFromPostal";

export const useHomeLocation = () => {
  const dispatch = useDispatch();
  // Function to handle postal code input
  const handlePostalCode = useCallback(
    async (values: { postalCode: string }) => {
      const result = await getCoordinatesFromPostal(values.postalCode);
      if (
        result.success &&
        result.latitude !== undefined &&
        result.longitude !== undefined
      ) {
        dispatch(
          setPersonalInfoAction({
            locationCoords: {
              latitude: result.latitude,
              longitude: result.longitude,
            },
            enableLocation: true,
          })
        );
        console.log("Coordinates set from postal code:", result);
      } else {
        console.warn("Could not fetch coordinates:", result.message);
      }
      dispatch(setPersonalInfoAction({ postalCode: values.postalCode }));
      router.push("/(auth)/CrimeAlert");
    },
    [dispatch]
  );

  return { handlePostalCode };
};
