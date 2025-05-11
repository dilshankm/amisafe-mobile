/**
 * Layout component for the Settings pages in the application.
 * Configures the navigation stack with shared screen options and individual screen configurations.
 *
 * @returns A Stack navigator component with the following screens:
 * - PersonalDetails: Displays user's personal information
 * - CrimeAlert: Manages crime alert settings
 * - DeleteAccount: Handles account deletion functionality
 *
 * Each screen is configured with consistent header styling:
 * - Primary color theme
 * - Left-aligned titles
 * - 20px font size
 * - 600 font weight
 * - Minimal back button display
 * - No header shadow
 */
import { Stack } from "expo-router";
import { colors } from "@/constants/theme";
import { labels } from "@/constants/labels";

export default function SettingsPagesLayout() {
  return (
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
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
        },
      }}
    >
      {/* Personal Details Screen */}
      <Stack.Screen
        name="PersonalDetails"
        options={{
          headerTitle: labels.personalDetails,
          headerShown: true,
          headerBackTitle: "",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
      {/* Crime Alert Screen */}
      <Stack.Screen
        name="CrimeAlert"
        options={{
          headerTitle: labels.crimeAlert,
          headerShown: true,
          headerBackTitle: "",
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      />
      {/* Delete Account Screen */}
      <Stack.Screen
        name="DeleteAccount"
        options={{
          headerTitle: labels.deleteAccount,
          headerShown: true,
          headerBackTitle: "",
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
