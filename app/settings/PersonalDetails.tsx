/**
 * PersonalDetails Component
 *
 * A React functional component that displays user's personal information retrieved from Redux store.
 * The component shows the user's name, mobile number, and date of birth in a styled layout.
 *
 * @component
 * @returns {JSX.Element} A SafeAreaView containing user's personal details
 *
 * @example
 * ```tsx
 * <PersonalDetails />
 * ```
 *
 * @remarks
 * The component uses:
 * - Redux selector to fetch personal information from auth state
 * - SafeAreaView for proper layout on devices with notches
 * - Custom Logo component with personal icon
 * - DetailField components to display individual information
 */
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/common/Logo";
import { icons } from "@/constants/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DetailField from "@/components/common/DetailField";

const PersonalDetails: React.FC = () => {
  const name = useSelector((state: RootState) => state.auth.personalInfo.name);
  const mobile = useSelector(
    (state: RootState) => state.auth.personalInfo.mobile
  );
  const dob = useSelector((state: RootState) => state.auth.personalInfo.dob);

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-white px-4 pt-6">
      {/* Title + Logo */}
      <View className="items-center">
        <View className="mt-12 mb-8">
          <Logo source={icons.personal} size={100} />
        </View>
      </View>

      {/* Fields */}
      <View className="space-y-4 mt-4">
        <DetailField value={name} />
        <DetailField value={mobile} />
        <DetailField value={dob} />
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetails;
