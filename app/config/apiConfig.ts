// API Base URLs for different environments
export const API_URLS = {
  development: "https://pok7e31yel.execute-api.eu-west-2.amazonaws.com/dev",
  staging: "https://pok7e31yel.execute-api.eu-west-2.amazonaws.com/staging",
  production: "https://pok7e31yel.execute-api.eu-west-2.amazonaws.com/prod",
  postcodesIO: "https://api.postcodes.io",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  crimes: {
    nearby: "/api/v1/crimes/nearby",
  },
  users: {
    base: "/api/v1/users",
    profile: "/api/v1/users/profile",
    settings: "/api/v1/users/settings",
    getByEmail: (email: string) => `/api/v1/users/${encodeURIComponent(email)}`,
  },
  postcodes: {
    lookup: "/postcodes",
  },
  auth: {
    sendOtp: "/v1/otp",
    verifyOtp: "/v1/verify-otp",
  },
} as const;

// API Configuration type
interface ApiConfig {
  readonly baseUrl: string;
  readonly endpoints: typeof API_ENDPOINTS;
  readonly headers: {
    readonly contentType: string;
    readonly accessControlAllowOrigin: string;
  };
}

// Create and export the API configuration
export const apiConfig: ApiConfig = {
  baseUrl: API_URLS.production,
  endpoints: API_ENDPOINTS,
  headers: {
    contentType: "application/json",
    accessControlAllowOrigin: "*",
  },
} as const;
