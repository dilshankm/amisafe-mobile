/**
 * Shows an alert message with customized content based on response and business messages.
 *
 * @param responseMessage - The message received from server response, might contain error details
 * @param businessMessage - The default business message to be displayed
 * @param alertControls - Object containing control functions for alert management
 * @param alertControls.setAlertMessage - Function to set the alert message content
 * @param alertControls.setShowAlert - Function to control alert visibility
 *
 * @remarks
 * The function first checks if the response message indicates connectivity issues.
 * If true, displays a network error message; otherwise shows the business message.
 * There's a small delay (10ms) between hiding and showing the alert to ensure proper state updates.
 */
export const showAlertMessage = (
  responseMessage: string | undefined,
  businessMessage: string,
  alertControls: {
    setAlertMessage: (msg: string) => void;
    setShowAlert: (show: boolean) => void;
  }
) => {
  console.log(responseMessage);
  const finalMessage =
    responseMessage?.includes("Network") || // "Network Error"
    responseMessage?.includes("connect") || // "Failed to connect"
    responseMessage?.includes("ERR_NETWORK") || // Axios/Fetch code
    responseMessage?.includes("internet") || // "No internet"
    responseMessage?.includes("offline") || // "Offline mode"
    responseMessage?.includes("disconnect") || // "Disconnected"
    responseMessage?.includes("timeout") || // "Connection timeout"
    responseMessage?.includes("unreachable") || // "Server unreachable"
    responseMessage?.includes("refused") || // "Connection refused"
    responseMessage?.includes("failed") || // "Request failed"
    responseMessage?.includes("proxy") || // "Proxy error"
    responseMessage?.includes("socket") // "Socket closed"
      ? "No internet connection. Please check your connection and try again."
      : businessMessage;

  alertControls.setShowAlert(false);
  setTimeout(() => {
    alertControls.setAlertMessage(finalMessage);
    alertControls.setShowAlert(true);
  }, 10);
};
