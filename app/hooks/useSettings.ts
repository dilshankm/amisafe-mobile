/**
 * Custom React hook for managing user settings actions such as logout and account deletion.
 *
 * This hook provides state and handlers for displaying confirmation alerts,
 * confirming or cancelling logout and account deletion, and performing the
 * necessary Redux and navigation actions.
 *
 * @returns An object containing:
 * - `showLogoutAlert`: Whether the logout confirmation alert is visible.
 * - `showDeleteAlert`: Whether the delete account confirmation alert is visible.
 * - `triggerLogoutAlert`: Function to show the logout confirmation alert.
 * - `triggerDeleteAlert`: Function to show the delete account confirmation alert.
 * - `confirmLogout`: Function to confirm logout, dispatches logout action and navigates to auth screen.
 * - `confirmDeleteAccount`: Function to confirm account deletion, clears auth state, deletes user, and navigates to auth screen.
 * - `cancelLogout`: Function to hide the logout confirmation alert.
 * - `cancelDelete`: Function to hide the delete account confirmation alert.
 */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { logout } from "@/store/authSlice";
import { deleteUserByEmail } from "@/services/userService";
import { RootState } from "@/store/store";

export const useSettings = () => {
  const dispatch = useDispatch();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { email } = useSelector((state: RootState) => state.auth);
  const triggerLogoutAlert = () => setShowLogoutAlert(true);
  const triggerDeleteAlert = () => setShowDeleteAlert(true);
  // Function to confirm logout
  const confirmLogout = () => {
    dispatch(logout());
    router.replace("/(auth)");
    setShowLogoutAlert(false);
  };

  // Function to confirm account deletion
  const confirmDeleteAccount = () => {
    dispatch(logout());
    deleteUserByEmail(email);
    router.replace("/(auth)");
    setShowDeleteAlert(false);
  };

  // Function to cancel logout and delete actions
  const cancelLogout = () => setShowLogoutAlert(false);
  // Function to cancel delete account action
  const cancelDelete = () => setShowDeleteAlert(false);

  return {
    showLogoutAlert,
    showDeleteAlert,
    triggerLogoutAlert,
    triggerDeleteAlert,
    confirmLogout,
    confirmDeleteAccount,
    cancelLogout,
    cancelDelete,
  };
};
