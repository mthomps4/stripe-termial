import { AUTH_TOKEN_KEY, USER_KEY } from "../constants";
import { SessionResponse } from "../types/signup";

export const getToken = (): SessionResponse["token"] | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = (): SessionResponse["user"] | null => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};
