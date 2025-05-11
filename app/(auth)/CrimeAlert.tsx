/**
 * CrimeAlert is a React functional component that renders a user interface for configuring crime alert notification preferences.
 *
 * This component allows users to:
 * - Enable or disable email notifications.
 * - Enable or disable push notifications.
 * - Select an alert radius from a dropdown menu.
 *
 * The component uses Formik for form state management and validation, and integrates with a custom `useCrimeAlert` hook to handle form submission.
 *
 * UI elements include:
 * - A centered alert icon.
 * - Switches for toggling email and push notifications.
 * - A dropdown field for selecting the alert radius.
 * - A finish button to submit the preferences.
 *
 * @component
 * @returns {JSX.Element} The rendered CrimeAlert configuration screen.
 */
import React from "react";
import { View, Text, Switch } from "react-native";
import { Formik } from "formik";
import Button from "../components/auth/Button";
import Logo from "../components/common/Logo";
import { icons } from "../constants/icons";
import { colors } from "@/constants/theme";
import { useCrimeAlert } from "../hooks/useCrimeAlert";
import DropdownField from "@/components/common/DropdownField";
import { alertRadiusOptions } from "../constants/alertRadiusOptions";
import { labels } from "@/constants/labels";

const CrimeAlert: React.FC = () => {
  const { handleFinish } = useCrimeAlert();
  const [open, setOpen] = React.useState(false);
  const [items] = React.useState(alertRadiusOptions);
  return (
    <Formik
      initialValues={{
        emailEnabled: true,
        pushEnabled: true,
        alertRadius: "1",
      }}
      onSubmit={handleFinish}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="flex-1 bg-white p-4">
          {/* Center alert icon */}
          <View className="flex-1 justify-center">
            <View className="absolute top-28 left-1/2 -translate-x-1/2 items-center">
              <Logo source={icons.alert} size={120} />
            </View>

            {/* Options */}
            <View className="absolute top-[40%] left-0 right-0 px-4 space-y-4">
              {/* Email Notifications */}
              <View className="flex-row justify-between items-center bg-secondary rounded-xl px-4 py-3 mb-5">
                <Text className="text-primary text-base">
                  {labels.emailNotifications}
                </Text>
                <Switch
                  trackColor={{ false: colors.secondary, true: colors.primary }}
                  thumbColor="#fff"
                  value={values.emailEnabled}
                  onValueChange={(value) => {
                    setFieldValue("emailEnabled", value);
                  }}
                />
              </View>

              {/* Push Notifications */}
              <View className="flex-row justify-between items-center bg-secondary rounded-xl px-4 py-3 mb-5">
                <Text className="text-primary text-base">
                  {labels.pushNotifications}
                </Text>
                <Switch
                  trackColor={{ false: colors.secondary, true: colors.primary }}
                  thumbColor="#fff"
                  value={values.pushEnabled}
                  onValueChange={(value) => {
                    setFieldValue("pushEnabled", value);
                  }}
                />
              </View>

              {/* Alert Radius */}
              <DropdownField
                label={labels.alertRadius}
                open={open}
                value={values.alertRadius}
                items={items}
                setOpen={setOpen}
                style="flex-row justify-between items-center bg-secondary rounded-xl px-4 py-4 mb-3"
                setValue={(callback) =>
                  setFieldValue("alertRadius", callback(values.alertRadius))
                }
              />

              {/* Finish Button */}
              <Button onPress={handleSubmit} name="Finish" />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CrimeAlert;
