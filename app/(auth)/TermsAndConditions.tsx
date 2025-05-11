/**
 * TermsAndConditions component displays the application's terms and conditions content
 * in a scrollable view and provides an "Agree" button for user acceptance.
 *
 * Utilizes the `useTerms` hook to retrieve the terms content and the handler for the agree action.
 *
 * @component
 * @returns {JSX.Element} The rendered Terms and Conditions screen.
 */
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "@/components/auth/Button";
import { useTerms } from "../hooks/useTerms";
import { labels } from "@/constants/labels";
const TermsAndConditions: React.FC = () => {
  const { content, handleAgree } = useTerms();
  return (
    <View className="flex-1 bg-white p-4">
      {/* Scrollable content */}
      <ScrollView className="flex-1 mb-8 px-4">{content}</ScrollView>
      {/* Agree Button */}
      <View className="pb-8">
        <Button name={labels.agree} onPress={handleAgree} />
      </View>
    </View>
  );
};

export default TermsAndConditions;
