import AsyncStorage from "@react-native-async-storage/async-storage";

// Local Storage Keys
export const AUTH_TOKEN_KEY = "sweet_treats_token";
export const USER_KEY = "sweet_treats_user";

export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
