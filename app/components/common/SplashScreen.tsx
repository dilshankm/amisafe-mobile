/**
 * SplashScreen component displays an animated logo using React Native Reanimated.
 *
 * The logo smoothly scales up and down in a repeating loop, providing a simple splash screen effect.
 *
 * @component
 * @example
 * ```tsx
 * <SplashScreen />
 * ```
 *
 * @returns {JSX.Element} The animated splash screen component.
 */
import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { icons } from "@/constants/icons";

const SplashScreen: React.FC = () => {
  const scale = useSharedValue(1);
  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 700,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Logo */}
      {/* The logo is animated to scale up and down */}
      <Animated.Image
        source={icons.logo}
        style={[
          { width: 150, height: 150, resizeMode: "contain" },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default SplashScreen;
