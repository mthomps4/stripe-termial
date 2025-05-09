// Local Storage Keys
import * as SecureStore from "expo-secure-store";

export const AUTH_TOKEN_KEY = "sweet_treats_token";
export const USER_KEY = "sweet_treats_user";

export const getCurrentUser = async () => {
  try {
    const user = await SecureStore.getItemAsync(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
