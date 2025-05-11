/**
 * AppLoader is a React functional component that displays an animated logo
 * using React Native Reanimated. The logo smoothly scales up and down in a loop,
 * providing a visual loading indicator.
 *
 * @returns {JSX.Element} A centered, animated logo inside a white background view.
 *
 * @example
 * ```tsx
 * <AppLoader />
 * ```
 */
import React from "react";
import { View, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { icons } from "@/constants/icons";

const AppLoader = () => {
  const scale = useSharedValue(1);

  // Animate scale
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

export default AppLoader;
