/**
 * A clickable link component that prompts users to sign up if they don't have an account.
 *
 * @param onPress - Callback function to handle the press event when the link is tapped.
 *
 * @example
 * <SignUpLink onPress={() => navigation.navigate('SignUp')} />
 */
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { labels } from "@/constants/labels";

interface SignUpLinkProps {
  onPress: () => void;
}

const SignUpLink: React.FC<SignUpLinkProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-primary text-center text-base mt-8">
        {labels.signUpLinkText}
      </Text>
    </TouchableOpacity>
  );
};

export default SignUpLink;
