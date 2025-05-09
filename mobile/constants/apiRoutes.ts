import Constants from "expo-constants";

const BASE_API_URL = Constants.expoConfig?.extra?.eas?.apiUrl;
const API_ROUTE = BASE_API_URL + "/api";

// Auth Routes
export const LOGIN_ROUTE = `${API_ROUTE}/login`;
export const LOGOUT_ROUTE = `${API_ROUTE}/logout`;

// Stripe Terminal Connection Token
export const GET_CONNECTION_TOKEN_ROUTE = `${API_ROUTE}/stripe/terminal/connection_token`;
