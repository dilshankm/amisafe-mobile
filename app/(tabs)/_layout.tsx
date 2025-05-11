/**
 * Renders the main tab layout for the application using the `Tabs` component.
 *
 * This layout includes four main screens:
 * - "Current Crime Map": Displays the current crime map.
 * - "Home Crime Map": Displays the crime map for the user's home area.
 * - "Crime Predictions": Shows crime prediction analytics.
 * - "Settings": Provides access to application settings.
 *
 * Each tab is configured with a custom icon and label, and the tab bar is styled for a modern appearance.
 * The header is customized to include a logo on the right and uses the application's primary color scheme.
 *
 * @returns {JSX.Element} The tab navigator layout for the app.
 */
import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { icons } from "@/constants/icons";
import Logo from "@/components/common/Logo";
import { labels } from "@/constants/labels";

const TabIcon = ({ focused, iconName, iconType }: any) => {
  const IconComponent = iconType;

  return (
    <View className="items-center justify-center mt-1">
      <IconComponent
        name={iconName}
        size={28}
        color={focused ? colors.primary : "#8e8e93"}
      />
    </View>
  );
};

const __Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerRight: () => (
          <View style={{ marginRight: 5 }}>
            <Logo source={icons.logo} size={50} />
          </View>
        ),
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "500",
          color: colors.primary,
        },
        headerTitleAlign: "left",
        headerBackButtonDisplayMode: "minimal",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
      }}
    >
      {/* Current Crime Map */}
      <Tabs.Screen
        name="index"
        options={{
          title: labels.currentCrimeMap,
          headerShown: true,
          tabBarLabel: labels.currentMap,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="map"
              iconType={MaterialIcons}
            />
          ),
        }}
      />
      {/* Home Crime Map */}
      <Tabs.Screen
        name="HomeCrimeMap"
        options={{
          title: labels.homeCrimeMap,
          headerShown: true,
          tabBarLabel: labels.homeMap,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" iconType={Ionicons} />
          ),
        }}
      />
      {/*Crime Predict */}
      <Tabs.Screen
        name="Predict"
        options={{
          title: labels.crimePredictions,
          headerShown: true,
          tabBarLabel: labels.crimePredictions,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="alert-triangle"
              iconType={Feather}
            />
          ),
        }}
      />
      {/* Settings */}
      <Tabs.Screen
        name="Settings"
        options={{
          title: labels.settings,
          headerShown: true,
          tabBarLabel: labels.settings,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="settings"
              iconType={MaterialIcons}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default __Layout;
