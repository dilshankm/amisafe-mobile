import { apiConfig } from "../config/apiConfig";
import { MESSAGES } from "../utils/errorMessages";

export interface User {
  id: string;
  email: string;
  name: string;
  mobile: string;
  dob: string;
  currentLocation: {
    latitude: string;
    longitude: string;
    street: {
      id: string | null;
      name: string;
    };
  };
  preferences: {
    alertRadius: number;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

export const fetchUserByEmail = async (
  email: string
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.users.getByEmail(
      email
    )}`;
    console.log("Fetching user from:", url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": apiConfig.headers.contentType,
        "Access-Control-Allow-Origin":
          apiConfig.headers.accessControlAllowOrigin,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json?.message || MESSAGES.SOMETHING_WENT_WRONG,
      };
    }
    return {
      success: true,
      data: json as User,
    };
  } catch (err) {
    return {
      success: false,
      message: MESSAGES.SERVER_ERROR,
    };
  }
};

export const createUser = async (data: {
  email: string;
  name: string;
  mobile: string;
  dob: string;
  currentLocation: {
    latitude: string;
    longitude: string;
    street: { name: string };
  };
  preferences: {
    alertRadius: number;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.users.base}`,
      {
        method: "POST",
        headers: {
          "Content-Type": apiConfig.headers.contentType,
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        message: err?.message || MESSAGES.USER_CREATE_FAILED,
      };
    }
    return { success: true };
  } catch (err) {
    console.error("createUser Error:", err);
    return { success: false, message: MESSAGES.SERVER_ERROR };
  }
};

export const deleteUserByEmail = async (
  email: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.users.getByEmail(
      email
    )}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": apiConfig.headers.contentType,
      },
    });
    let json = null;
    const text = await res.text();
    if (text) {
      json = JSON.parse(text);
    }
    if (!res.ok) {
      return {
        success: false,
        message: json?.message || MESSAGES.USER_DELETE_FAILED,
      };
    }
    return {
      success: true,
      message: MESSAGES.USER_DELETE_SUCCESS,
    };
  } catch (err) {
    console.error("deleteUserByEmail Error:", err);
    return {
      success: false,
      message: MESSAGES.SERVER_ERROR,
    };
  }
};

export const updateUserByEmail = async (
  email: string,
  updates: Partial<User>
): Promise<{ success: boolean; message?: string }> => {
  try {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.users.getByEmail(
      email
    )}`;
    console.log("🛠️ Updating user at:", url);
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": apiConfig.headers.contentType,
        "Access-Control-Allow-Origin":
          apiConfig.headers.accessControlAllowOrigin,
      },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json?.message || MESSAGES.USER_UPDATE_FAILED,
      };
    }
    return {
      success: true,
      message: json?.message || MESSAGES.USER_UPDATE_SUCCESS,
    };
  } catch (err) {
    console.error("updateUserByEmail Error:", err);
    return {
      success: false,
      message: MESSAGES.SERVER_ERROR,
    };
  }
};
