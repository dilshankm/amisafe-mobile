/**
 * Custom React hook to access the global loading state from the Redux store.
 *
 * @returns {boolean} The current value of the global loading state.
 *
 * @example
 * const isLoading = useGlobalLoading();
 * if (isLoading) {
 *   // Show loading spinner
 * }
 */
import { useSelector } from "react-redux";

export const useGlobalLoading = () => {
  return useSelector((state: any) => state.ui.globalLoading);
};
