import { apiConfig } from "../config/apiConfig";
import { MESSAGES } from "../utils/errorMessages";

/**
 * Sends a one-time password (OTP) to the specified email address.
 *
 * @param email - The email address to which the OTP should be sent.
 * @returns A promise that resolves to an object containing a success flag and a message.
 * @throws Returns a failure message if unable to connect to the server.
 */

/**
 * Verifies the provided OTP for the specified email address.
 *
 * @param email - The email address associated with the OTP.
 * @param otp - The one-time password to verify.
 * @returns A promise that resolves to an object containing a success flag and a message.
 * @throws Returns a failure message if unable to connect to the server.
 */
export const sendOtp = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.auth.sendOtp}`,
      {
        method: "POST",
        headers: {
          "Content-Type": apiConfig.headers.contentType,
          "Access-Control-Allow-Origin":
            apiConfig.headers.accessControlAllowOrigin,
          mode: "no-cors",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await res.json();
    console.log("sendOtp response", json);
    return { success: res.ok, message: json.message };
  } catch (err) {
    return { success: false, message: MESSAGES.SERVER_ERROR };
  }
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.auth.verifyOtp}`,
      {
        method: "POST",
        headers: {
          "Content-Type": apiConfig.headers.contentType,
          "Access-Control-Allow-Origin":
            apiConfig.headers.accessControlAllowOrigin,
          mode: "no-cors",
        },
        body: JSON.stringify({ email, otp }),
      }
    );
    const json = await res.json();
    return { success: res.ok, message: json.message };
  } catch (err) {
    return { success: false, message: MESSAGES.SERVER_ERROR };
  }
};
