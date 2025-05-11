/**
 * Settings screen component for the application.
 *
 * This component displays the user's name, profile logo, and a list of clickable fields
 * for navigating to personal details, crime alert settings, logging out, and deleting the account.
 * It also handles confirmation alerts for logout and account deletion actions.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Settings screen.
 *
 * @remarks
 * - Uses Formik for form state management, though no form submission is currently implemented.
 * - Utilizes Redux to retrieve the user's name from the authentication state.
 * - Employs custom hooks (`useSettings`) to manage alert dialogs for logout and account deletion.
 * - Navigation is handled via the Expo Router.
 *
 * @dependencies
 * - react
 * - react-native
 * - formik
 * - react-native-safe-area-context
 * - react-redux
 * - expo-router
 * - @/components/common/ClickableField
 * - @/components/common/Alert
 * - @/hooks/useSettings
 * - @/constants/images
 * - @/components/common/Logo
 */
import React from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { router } from "expo-router";
import ClickableField from "@/components/common/ClickableField";
import CustomAlert from "@/components/common/Alert";
import { useSettings } from "@/hooks/useSettings";
import { images } from "@/constants/images";
import Logo from "@/components/common/Logo";
import { labels } from "@/constants/labels";

const Settings: React.FC = () => {
  const userName = useSelector(
    (state: RootState) => state.auth.personalInfo.name
  );

  const {
    showLogoutAlert,
    showDeleteAlert,
    triggerLogoutAlert,
    triggerDeleteAlert,
    confirmLogout,
    confirmDeleteAccount,
    cancelLogout,
    cancelDelete,
  } = useSettings();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          mobile: "",
          dob: { day: "", month: "", year: "" },
        }}
        onSubmit={() => {}}
      >
        {() => (
          <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
            <View className="px-4 pt-6">
              {/* User name */}
              <Text className="text-2xl font-semibold text-primary">
                {userName}
              </Text>
            </View>

            <View className="px-4 pt-4 space-y-2 mt-1 ">
              <View className="items-center justify-center w-full mb-20 mt-10">
                {/* User Image */}
                <Logo source={images.user} size={100} />
              </View>

              {/* Personal Details */}
              <ClickableField
                label="personalDetails"
                value={labels.personalDetailsValue}
                onPress={() => router.push("/settings/PersonalDetails")}
              />
              {/* Crime Alert */}
              <ClickableField
                label="crimeAlert"
                value={labels.crimeAlertValue}
                onPress={() => router.push("/settings/CrimeAlert")}
              />
              {/* Logout */}
              <ClickableField
                label="logout"
                value={labels.logoutValue}
                onPress={triggerLogoutAlert}
              />
              {/* Delete Account */}
              <ClickableField
                label="deleteAccount"
                value={labels.deleteAccountValue}
                onPress={triggerDeleteAlert}
              />
            </View>
          </SafeAreaView>
        )}
      </Formik>

      {/* Logout Alert Box */}
      {showLogoutAlert && (
        <CustomAlert
          title={labels.logoutTitle}
          message={labels.logoutMessage}
          confirmText={labels.logoutConfirm}
          cancelText={labels.logoutCancel}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
      {/* Delete Account Alert Box */}
      {showDeleteAlert && (
        <CustomAlert
          title={labels.deleteTitle}
          message={labels.deleteMessage}
          confirmText={labels.deleteConfirm}
          cancelText={labels.deleteCancel}
          onConfirm={confirmDeleteAccount}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default Settings;
