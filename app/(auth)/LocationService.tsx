/**
 * A React functional component that prompts the user to enable location services.
 *
 * This component displays a centered location logo and a button labeled "Enable Location".
 * When the button is pressed, it triggers the `enableLocation` function from the `useLocation` hook.
 *
 * @component
 * @returns {JSX.Element} The rendered component for enabling location services.
 */
import { View } from "react-native";
import { useLocation } from "../hooks/useLocation";
import Button from "../components/auth/Button";
import Logo from "../components/common/Logo";
import { icons } from "../constants/icons";
const LocationService: React.FC = () => {
  const { enableLocation } = useLocation();
  return (
    <View className="flex-1 bg-white p-4">
      {/* Center location Logo */}
      <View className="flex-1 justify-center">
        <View className="absolute top-20 left-1/2 -translate-x-1/2 items-center">
          <Logo source={icons.location} size={230} />
        </View>

        {/* Email input & login button */}
        <View className="absolute top-[60%] left-0 right-0 px-4 space-y-1">
          <Button onPress={enableLocation} name="Enable Location" />
        </View>
      </View>
    </View>
  );
};

export default LocationService;
