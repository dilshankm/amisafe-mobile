/**
 * A customizable bottom sheet component for displaying detailed crime information.
 *
 * This component uses React Native's Animated API and PanResponder to provide
 * a draggable bottom sheet UI. It exposes `show` and `hide` methods via a ref,
 * allowing parent components to control its visibility programmatically.
 *
 * @param {Object} props - Component props.
 * @param {CrimeInfo | null} props.crime - The crime information to display. If null, the sheet is hidden.
 * @param {React.Ref<BottomSheetHandles>} ref - Ref object exposing `show` and `hide` methods.
 *
 * @returns {JSX.Element | null} The rendered bottom sheet if `crime` is provided, otherwise null.
 *
 * @example
 * const bottomSheetRef = useRef<BottomSheetHandles>(null);
 *
 * // To show the bottom sheet:
 * bottomSheetRef.current?.show();
 *
 * // To hide the bottom sheet:
 * bottomSheetRef.current?.hide();
 */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  Animated,
  Dimensions,
  View,
  Text,
  Image,
  PanResponder,
  ImageSourcePropType,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

export interface CrimeInfo {
  type: string;
  location: string;
  date: string;
  status: string;
  icon: { uri: string };
  image: ImageSourcePropType;
  category: string;
}

export interface BottomSheetHandles {
  show: () => void;
  hide: () => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.34;

const CustomBottomSheet = forwardRef<
  BottomSheetHandles,
  { crime: CrimeInfo | null }
>(({ crime }, ref) => {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          hide();
        } else {
          show();
        }
      },
    })
  ).current;

  const show = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({ show, hide }));

  useEffect(() => {
    if (crime) show();
  }, [crime]);

  if (!crime) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "box-none",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: SHEET_HEIGHT,
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
          transform: [{ translateY }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-4xl font-bold text-black flex-1">
            {crime.type}
          </Text>
          <Image
            source={crime.image}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        </View>

        {/* Location */}
        <View className="flex-row items-center mt-4">
          <Feather name="map-pin" size={26} color={colors.primary} />
          <Text className="ml-4 font-bold text-xl text-primary">
            {crime.location}
          </Text>
        </View>

        {/* Date */}
        <View className="flex-row items-center mt-4">
          <Feather name="calendar" size={26} color={colors.grey} />
          <Text className="ml-4 font-bold text-xl text-gray">{crime.date}</Text>
        </View>

        {/* Status */}
        <View className="flex-row items-center mt-4">
          <MaterialCommunityIcons
            name="comment-alert"
            size={26}
            color={colors.red}
          />
          <Text className="ml-4 font-bold text-xl text-red">
            {crime.status
              .replace(/[^a-zA-Z0-9 ]/g, " ")
              .replace(/\s+/g, " ")
              .trim()}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
});

export default CustomBottomSheet;
