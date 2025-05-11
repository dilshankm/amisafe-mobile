/**
 * Renders a logo image with a customizable size.
 *
 * @param source - The image source for the logo. Accepts any valid `ImageSourcePropType`.
 * @param size - Optional. The width and height of the logo in pixels. If not provided, the image will not have explicit dimensions.
 *
 * @returns A React Native `Image` component displaying the logo.
 */
import React from "react";
import { Image, ImageSourcePropType } from "react-native";

interface LogoProps {
  source: ImageSourcePropType;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ source, size }) => {
  return (
    <Image
      source={source}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
};

export default Logo;
