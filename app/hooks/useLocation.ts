/**
 * Custom React hook to handle enabling and requesting location permissions.
 *
 * This hook provides a function to request foreground location permissions from the user,
 * handle permission denial, retrieve the current location, update the Redux store with
 * location-enabled status, and navigate to the HomeLocation screen upon success.
 *
 * @returns {Object} An object containing the `enableLocation` function.
 *
 * @example
 * const { enableLocation } = useLocation();
 * // Call enableLocation() to prompt for location access and handle flow.
 */
import { useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setPersonalInfoAction } from "../store/authSlice";
import * as Location from "expo-location";
import { labels } from "../constants/labels";

export const useLocation = () => {
  const dispatch = useDispatch();
  const enableLocation = useCallback(async () => {
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          labels.permissionDeniedTitle,
          labels.permissionDeniedMessage
        );
        return;
      }
      // Get current position
      const location = await Location.getCurrentPositionAsync({});
      dispatch(
        setPersonalInfoAction({
          enableLocation: true,
        })
      );
      console.log("Location enabled:", location.coords);
      router.push("/(auth)/HomeLocation");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(labels.errorTitle, labels.errorMessage);
    }
  }, [dispatch]);
  return {
    enableLocation,
  };
};
