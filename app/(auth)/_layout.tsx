/**
 * AuthLayout is a stack navigator component that manages the authentication flow of the application.
 *
 * It defines the navigation structure for the following authentication-related screens:
 * - SignUp: Initial registration screen.
 * - OTP: One-time password verification screen.
 * - SignUpPersonal: Collects user's personal details.
 * - TermsAndConditions: Displays terms and conditions for user agreement.
 * - LocationService: Enables location services for the user.
 * - HomeLocation: Allows the user to set their home location.
 * - CrimeAlert: Screen for reporting or viewing crime alerts.
 *
 * Each screen is configured with custom header options, such as title, alignment, and visibility,
 * to provide a consistent and user-friendly authentication experience.
 *
 * @returns {JSX.Element} The stack navigator for the authentication flow.
 */
import { labels } from "@/constants/labels";
import { colors } from "@/constants/theme";
import { Stack } from "expo-router";
export default function AuthLayout() {
  return (
    // Stack navigator configuration for authentication flow
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
        headerTitle: "",
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerBackButtonMenuEnabled: false,
        headerTintColor: colors.primary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      {/* Sign Up Screen - Initial registration screen */}
      <Stack.Screen name="SignUp" options={{ headerShown: true }} />
      {/* OTP Screen - One-time password verification */}
      <Stack.Screen name="OTP" options={{ headerShown: true }} />
      {/* Personal Information Screen - User details collection */}
      <Stack.Screen
        name="SignUpPersonal"
        options={{
          headerShown: true,
          headerTitle: labels.personalDetails,
          headerBackTitle: "",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
      {/* Terms and Conditions Screen - User agreement */}
      <Stack.Screen
        name="TermsAndConditions"
        options={{
          headerShown: true,
          headerTitle: labels.termsAndConditions,
          headerBackTitle: "",
          headerBackButtonMenuEnabled: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
      {/* Location Service Screen - Enable location services */}
      <Stack.Screen
        name="LocationService"
        options={{
          headerShown: true,
          headerTitle: labels.locationService,
          headerBackTitle: "",
          headerBackButtonMenuEnabled: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
      {/* Home Location Screen - Set user's home location */}
      <Stack.Screen
        name="HomeLocation"
        options={{
          headerShown: true,
          headerTitle: labels.homeLocation,
          headerBackTitle: "",
          headerBackButtonMenuEnabled: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />

      {/* Crime Alert Screen - Report or view crime alerts */}
      <Stack.Screen
        name="CrimeAlert"
        options={{
          headerShown: true,
          headerTitle: labels.crimeAlert,
          headerBackTitle: "",
          headerBackButtonMenuEnabled: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
    </Stack>
  );
}
