/**
 * A custom alert component that wraps React Native's Alert functionality.
 *
 * @component
 * @example
 * ```tsx
 * <CustomAlert
 *   title="Success"
 *   message="Operation completed successfully"
 *   confirmText="OK"
 *   cancelText="Cancel"
 *   onConfirm={() => console.log('Confirmed')}
 *   onCancel={() => console.log('Cancelled')}
 * />
 * ```
 *
 * @param props - The properties for the CustomAlert component
 * @param props.title - The title of the alert
 * @param props.message - The message to display in the alert (can be null)
 * @param props.confirmText - The text for the confirm button (defaults to "OK")
 * @param props.cancelText - Optional text for the cancel button
 * @param props.onConfirm - Optional callback function when confirm is pressed
 * @param props.onCancel - Optional callback function when cancel is pressed
 *
 * @returns null - This component doesn't render any visible UI elements
 */
import { labels } from "@/constants/labels";
import React from "react";
import { Alert, AlertButton } from "react-native";

interface CustomAlertProps {
  title: string;
  message: string | null;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  title,
  message,
  confirmText = labels.ok,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  // Function to show the alert
  const showAlert = () => {
    const buttons: AlertButton[] = [];

    // Add cancel button if cancelText is provided
    if (cancelText) {
      buttons.push({
        text: cancelText,
        onPress: onCancel,
        style: "cancel",
      });
    }

    // Add confirm button
    buttons.push({
      text: confirmText,
      onPress: onConfirm,
    });
    Alert.alert(title, message ?? undefined, buttons);
  };

  React.useEffect(() => {
    showAlert();
  }, [title, message, confirmText, cancelText, onConfirm, onCancel]);
  return null;
};

export default CustomAlert;
