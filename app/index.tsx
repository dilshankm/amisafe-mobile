/**
 * Root component that handles navigation based on authentication state
 *
 * This component acts as the entry point of the application and redirects users
 * based on their authentication status:
 * - Authenticated users are redirected to the tabs route "/(tabs)"
 * - Unauthenticated users are redirected to the auth route "/(auth)"
 *
 * @returns {JSX.Element} A Redirect component that navigates to the appropriate route
 */
import { Redirect } from "expo-router";
import { useAppSelector } from "./store/store";

export default function Index() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  /// Redirect based on authentication status
  /// If the user is logged in, redirect to the tabs route
  /// If the user is not logged in, redirect to the auth route
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)" />;
  }
}
