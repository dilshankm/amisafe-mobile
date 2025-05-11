/**
 * DeleteAccount Component
 *
 * A React functional component that displays user account information in a delete account view.
 * Uses Redux selector to access user's personal information from the global state.
 *
 * @component
 * @example
 * ```tsx
 * <DeleteAccount />
 * ```
 *
 * @returns {JSX.Element} A SafeAreaView containing a form with user's personal information
 *                        including name, mobile number, and date of birth
 *
 * @remarks
 * The component uses:
 * - Redux for state management
 * - TextInputField component for form inputs
 * - Logo component for displaying icons
 * - SafeAreaView for safe area rendering
 */
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "@/components/auth/TextInputField";
import Logo from "@/components/common/Logo";
import { icons } from "@/constants/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { labels } from "@/constants/labels";

const DeleteAccount: React.FC = () => {
  const name = useSelector((state: RootState) => state.auth.personalInfo.name);
  const mobile = useSelector(
    (state: RootState) => state.auth.personalInfo.mobile
  );
  const dob = useSelector((state: RootState) => state.auth.personalInfo.dob);
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="flex-1 bg-white p-4">
        <View className="flex-1 justify-center">
          {/* Logo */}
          <View className="absolute top-20 left-1/2 -translate-x-1/2 items-center">
            <Logo source={icons.personal} size={100} />
          </View>

          {/* Form Fields */}
          <View className="absolute bottom-31 left-0 right-0 px-4 space-y-1">
            {/* Name */}
            <TextInputField value={name ?? ""} name={labels.name} />

            {/* Mobile */}
            <TextInputField value={mobile ?? ""} name={labels.mobile} />

            {/* DOB */}
            <TextInputField value={dob ?? ""} name={labels.dob} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccount;
