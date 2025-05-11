/**
 * Custom hook that provides the Terms & Conditions content for the AmiSafe app
 * and a handler for when the user agrees to the terms.
 *
 * - `content`: A React fragment containing the formatted Terms & Conditions text,
 *   including sections on introduction, services, data accuracy, user responsibilities,
 *   permissions, disclaimers, changes, and contact information.
 * - `handleAgree`: A callback function that dispatches an action to update the user's
 *   acceptance of the terms in the Redux store and navigates to the LocationService screen.
 *
 * @returns {Object} An object containing:
 *   - `content`: JSX.Element – The Terms & Conditions content to be rendered.
 *   - `handleAgree`: () => void – Function to call when the user agrees to the terms.
 *
 * @example
 * const { content, handleAgree } = useTerms();
 * // Render `content` in your component and call `handleAgree` on agreement.
 */
import React from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setPersonalInfoAction } from "../store/authSlice";
import { useCallback } from "react";

export const useTerms = () => {
  const dispatch = useDispatch();
  // Function to handle user agreement to terms
  const handleAgree = useCallback(() => {
    dispatch(setPersonalInfoAction({ termsAccepted: true }));
    router.push("/(auth)/LocationService");
  }, [dispatch]);

  // Terms & Conditions content
  const content = (
    <>
      <Text className="text-xl font-semibold text-primary mb-2">
        Introduction
      </Text>
      <Text className="text-base text-primary mb-4">
        Welcome to AmiSafe, a mobile application designed to enhance personal
        safety by providing real-time and predictive crime data across the
        United Kingdom. By using this application, you agree to comply with and
        be bound by the following terms and conditions. If you do not agree with
        any part of these terms, please do not use the app.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Services Provided
      </Text>
      <Text className="text-base text-primary mb-4">
        AmiSafe provides users with crime data sourced from the official UK
        Police database. The app offers real-time crime mapping, location-based
        alerts, and crime prediction features based on historical data and
        machine learning models. While we strive to ensure the accuracy of this
        information, we cannot guarantee its completeness or timeliness.
      </Text>

      <Text className="text-base text-primary mb-4">
        The prediction model uses statistical and algorithmic analysis to
        estimate the likelihood of future crime occurrences. These predictions
        are probabilistic in nature and are meant to inform, not to alarm or
        guarantee future events.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Data Accuracy & Limitations
      </Text>
      <Text className="text-base text-primary mb-4">
        All data displayed in AmiSafe is based on public records, which may have
        delays, inaccuracies, or be subject to change. AmiSafe does not verify
        the accuracy of the raw data provided by third-party sources. We are not
        liable for decisions made by users based on this information.
      </Text>

      <Text className="text-base text-primary mb-4">
        Users are encouraged to cross-check information with local authorities
        and to use the app as an additional resource rather than a sole
        decision-making tool.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        User Responsibilities
      </Text>
      <Text className="text-base text-primary mb-4">
        Users of AmiSafe agree to use the application in a lawful and ethical
        manner. You must not misuse the information for discrimination,
        profiling, or any other activity that may harm others or violate laws.
      </Text>

      <Text className="text-base text-primary mb-4">
        You are responsible for maintaining the confidentiality of any personal
        information you input into the app. AmiSafe does not store sensitive
        personal data beyond what is necessary for functionality (e.g., location
        data for alerts).
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Permissions & Privacy
      </Text>
      <Text className="text-base text-primary mb-4">
        AmiSafe may request access to your device’s location to provide accurate
        alerts and proximity-based services. This data is processed locally or
        securely via encrypted communication with our servers. No personal
        identifiable data is sold or shared with third parties without your
        consent.
      </Text>

      <Text className="text-base text-primary mb-4">
        By using AmiSafe, you agree to the collection and use of technical and
        location data in accordance with our Privacy Policy.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Disclaimers & Liability
      </Text>
      <Text className="text-base text-primary mb-4">
        AmiSafe is provided "as is" without warranties of any kind. While we aim
        to maintain a high level of service availability and data integrity, we
        do not guarantee uninterrupted access or data accuracy. Use of the app
        is at your own risk.
      </Text>

      <Text className="text-base text-primary mb-4">
        AmiSafe shall not be liable for any direct, indirect, or consequential
        damages resulting from the use or inability to use the application,
        including decisions made based on its content.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Changes to Terms
      </Text>
      <Text className="text-base text-primary mb-4">
        We reserve the right to modify these Terms & Conditions at any time.
        Users will be notified of any changes via app updates or notifications.
        Continued use of the app after such changes will be deemed as acceptance
        of the revised terms.
      </Text>

      <Text className="text-xl font-semibold text-primary mb-2">
        Contact Information
      </Text>
      <Text className="text-base text-primary mb-4">
        If you have any questions about these terms, the practices of AmiSafe,
        or your interactions with the application, you may contact our support
        team at dilshankm@outlook.com
      </Text>
    </>
  );

  return {
    content,
    handleAgree,
  };
};
