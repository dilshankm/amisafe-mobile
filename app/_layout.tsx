/**
 * Root layout component for the application.
 * Manages the navigation stack, global state, and persistent storage.
 *
 * @component
 * @remarks
 * This component sets up:
 * - Redux store provider
 * - Redux persist gate for state persistence
 * - Navigation stack with custom header configuration
 * - Global loading state management
 *
 * The layout includes two main stack screens:
 * - (auth): Authentication related screens with disabled back navigation
 * - (tabs): Tab navigation screens with hidden header
 *
 * @returns A configured navigation stack wrapped with state management providers
 *
 * @example
 * ```tsx
 * export default function App() {
 *   return <RootLayout />;
 * }
 * ```
 */
import { Stack } from "expo-router";
import "./globals.css";
import Logo from "./components/common/Logo";
import { View } from "react-native";
import { icons } from "./constants/icons";
import { enableScreens } from "react-native-screens";
import { colors } from "./constants/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import AppLoader from "./components/common/AppLoader";
import { useGlobalLoading } from "./hooks/useGlobalLoading";
import { PersistGate } from "redux-persist/integration/react";

enableScreens();

function LayoutWithLoader() {
  const loading = useGlobalLoading();
  if (loading) return <AppLoader />;
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.primary,
        headerRight: () => (
          <View style={{ marginRight: 5 }}>
            <Logo source={icons.logo} size={50} />
          </View>
        ),
        headerTitle: "",
      }}
    >
      {/* The header is hidden for the auth stack, and back navigation is disabled */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
          headerBackTitle: "",
        }}
      />
      {/* The header is hidden for the tabs stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LayoutWithLoader />
      </PersistGate>
    </Provider>
  );
}
