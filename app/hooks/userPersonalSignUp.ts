/**
 * Custom hook for handling personal sign-up form submission.
 *
 * This hook provides a `handlePersonalSubmit` callback that:
 * - Formats the date of birth from separate day, month, and year fields into a single string.
 * - Dispatches the personal information to the Redux store.
 * - Navigates to the Terms and Conditions screen, passing the personal information as route parameters.
 *
 * @returns An object containing the `handlePersonalSubmit` function.
 *
 * @example
 * const { handlePersonalSubmit } = usePersonalSignUp();
 * handlePersonalSubmit({ name: "John", mobile: "1234567890", dob: { day: "01", month: "01", year: "2000" } });
 */
import { router } from "expo-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPersonalInfoAction } from "../store/authSlice";

export const usePersonalSignUp = () => {
  const dispatch = useDispatch();
  // Function to handle personal information form submission
  const handlePersonalSubmit = useCallback(
    (values: {
      name: string;
      mobile: string;
      dob: { day: string; month: string; year: string };
    }) => {
      const formattedDOB = `${values.dob.year}-${values.dob.month}-${values.dob.day}`;
      const personalInfo = {
        name: values.name,
        mobile: values.mobile,
        dob: formattedDOB,
      };
      console.log("Personal form values:", personalInfo);
      // store in Redux
      dispatch(setPersonalInfoAction(personalInfo));
      // Navigate to Terms and Conditions screen
      router.push({
        pathname: "/(auth)/TermsAndConditions",
        params: personalInfo,
      });
    },
    [dispatch]
  );

  return { handlePersonalSubmit };
};
