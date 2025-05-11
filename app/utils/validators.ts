/**
 * Collection of Yup validation schemas and utility functions for form validation
 */

/**
 * Schema for validating OTP (One-Time Password) input
 */

/**
 * Checks if a given date is valid
 * @param date - The Date object to validate
 * @returns boolean indicating if the date is valid
 */

/**
 * Schema for validating email addresses
 */

/**
 * Schema for validating UK postal codes
 */

/**
 * Schema for validating user sign-up form data
 * Includes validation for:
 * - name (2-50 characters)
 * - mobile (10 digits)
 * - date of birth (with complex validation):
 *   - must be a valid date
 *   - cannot be in the future
 *   - user must be at least 13 years old
 *   - day must be between 1-31
 *   - month must be between 1-12
 *   - year must be between 1900-2099
 */
import * as Yup from "yup";
import { MESSAGES } from "./errorMessages";

export const OtpSchema = Yup.object().shape({
  otp: Yup.string().required(MESSAGES.VALIDATION.OTP_REQUIRED),
});

export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(MESSAGES.VALIDATION.EMAIL_FORMAT)
    .required(MESSAGES.VALIDATION.EMAIL_REQUIRED),
});

export const PostalCodeSchema = Yup.object().shape({
  postalCode: Yup.string()
    .matches(
      /^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/i,
      MESSAGES.VALIDATION.POSTAL_CODE_INVALID
    )
    .required(MESSAGES.VALIDATION.POSTAL_CODE_REQUIRED),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, MESSAGES.VALIDATION.NAME_TOO_SHORT)
    .max(50, MESSAGES.VALIDATION.NAME_TOO_LONG)
    .required(MESSAGES.VALIDATION.NAME_REQUIRED),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, MESSAGES.VALIDATION.MOBILE_FORMAT)
    .required(MESSAGES.VALIDATION.MOBILE_REQUIRED),
  dob: Yup.object()
    .shape({
      day: Yup.string()
        .matches(
          /^(0?[1-9]|[12][0-9]|3[01])$/,
          MESSAGES.VALIDATION.DOB_DAY_RANGE
        )
        .required(MESSAGES.VALIDATION.DOB_DAY_REQUIRED),
      month: Yup.string()
        .matches(/^(0?[1-9]|1[012])$/, MESSAGES.VALIDATION.DOB_MONTH_RANGE)
        .required(MESSAGES.VALIDATION.DOB_MONTH_REQUIRED),
      year: Yup.string()
        .matches(/^(19|20)\d{2}$/, MESSAGES.VALIDATION.DOB_YEAR_RANGE)
        .required(MESSAGES.VALIDATION.DOB_YEAR_REQUIRED),
    })
    .test("is-valid-date", "Invalid Date of Birth", function (value) {
      if (!value) return false;

      const { day, month, year } = value;
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      // Basic validation
      if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
        return false;
      }

      // Check for valid date
      const date = new Date(yearNum, monthNum - 1, dayNum);

      // Check if the date is valid and matches the input values
      const isValidDate =
        date.getFullYear() === yearNum &&
        date.getMonth() === monthNum - 1 &&
        date.getDate() === dayNum;

      // Check if date is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isFutureDate = date > today;

      // Check if user is at least 13 years old
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
      const isUnderage = date > minAgeDate;

      if (!isValidDate) {
        return this.createError({
          path: "dob",
          message: MESSAGES.VALIDATION.DOB_INVALID,
        });
      }

      if (isFutureDate) {
        return this.createError({
          path: "dob",
          message: MESSAGES.VALIDATION.DOB_FUTURE,
        });
      }

      if (isUnderage) {
        return this.createError({
          path: "dob",
          message: MESSAGES.VALIDATION.DOB_AGE,
        });
      }

      return true;
    }),
});
