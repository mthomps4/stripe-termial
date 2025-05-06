export const ROOT_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
// export const API_VERSION = "v1";
export const API_URL = `${ROOT_API_URL}/api`;

export const SIGNUP_URL = `${API_URL}/signup`;
export const LOGIN_URL = `${API_URL}/login`;

// Local Storage
export const AUTH_TOKEN_KEY = "sweet_treats_token";
export const USER_KEY = "sweet_treats_user";
