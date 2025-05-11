/**
 * CrimeAlert component allows users to configure their crime alert notification preferences.
 *
 * @component
 * @description Provides a form interface for users to:
 * - Toggle push notifications
 * - Toggle email notifications
 * - Select alert radius from predefined options
 * - Set postal code for location-based alerts
 *
 * The component uses Formik for form management and validates postal code input.
 * It automatically syncs changes with the backend using useCrimeAlertUpdate hook.
 * Initial values are populated from Redux store user state.
 *
 * @returns {JSX.Element} A form interface for crime alert settings
 */
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import Logo from "../components/common/Logo";
import TextInputField from "@/components/auth/TextInputField";
import { icons } from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCrimeAlertUpdate } from "../hooks/useCrimeAlertUpdate";
import ToggleField from "@/components/common/ToggleField";
import DropdownField from "@/components/common/DropdownField";
import { PostalCodeSchema } from "../utils/validators";
import { alertRadiusOptions } from "../constants/alertRadiusOptions";
import { labels } from "@/constants/labels";

const CrimeAlert: React.FC = () => {
  // Get user data from Redux
  const user = useSelector((state: RootState) => state.auth.personalInfo);
  const [open, setOpen] = React.useState(false);
  const [items] = React.useState(alertRadiusOptions);
  return (
    <Formik
      initialValues={{
        emailEnabled: user.crimeAlerts?.emailEnabled ?? true,
        pushEnabled: user.crimeAlerts?.pushEnabled ?? true,
        alertRadius: user.crimeAlerts?.alertRadius ?? "10",
        postalCode: user.postalCode ?? "",
      }}
      validationSchema={PostalCodeSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, handleChange, handleBlur, errors }) => {
        useCrimeAlertUpdate(values, errors.postalCode);
        return (
          <SafeAreaView
            edges={["bottom"]}
            className="flex-1 bg-white px-4 pt-4"
          >
            <View className="flex-1 justify-center">
              {/* Icon */}
              <View className="absolute top-28 left-1/2 -translate-x-1/2 items-center">
                <Logo source={icons.alert} size={120} />
              </View>

              {/* Push Notifications */}
              <View className="absolute top-[40%] left-0 right-0 px-4 space-y-4">
                <ToggleField
                  label={labels.pushNotifications}
                  value={values.pushEnabled}
                  onValueChange={(value) =>
                    void setFieldValue("pushEnabled", value)
                  }
                />

                {/* Email Notifications */}
                <ToggleField
                  label={labels.emailNotifications}
                  value={values.emailEnabled}
                  onValueChange={(value) =>
                    void setFieldValue("emailEnabled", value)
                  }
                />

                {/* Alert Radius */}
                <DropdownField
                  label={labels.alertRadius}
                  open={open}
                  value={values.alertRadius}
                  items={items}
                  style="w-full mt-6 flex-row items-center justify-between bg-secondary px-4 py-4 rounded-lg border border-transparent mb-2 min-h-[56px]"
                  setOpen={setOpen}
                  setValue={(callback) =>
                    setFieldValue("alertRadius", callback(values.alertRadius))
                  }
                />

                {/* Postal Code */}
                <TextInputField
                  value={values.postalCode}
                  name={labels.postalCode}
                  onChangeText={(text) => {
                    handleChange("postalCode")(text.toUpperCase());
                    setFieldValue("postalCode", text.toUpperCase());
                  }}
                  className="w-full mt-6 flex-row items-center justify-between text-primary bg-secondary px-4 py-4 rounded-lg border border-transparent mb-2 min-h-[56px]"
                  onBlur={handleBlur("postalCode")}
                  keyboardSetting="default"
                  isValidationEnabled={true}
                  isValid={!errors.postalCode}
                  errorMessage={errors.postalCode}
                />
              </View>
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

export default CrimeAlert;
