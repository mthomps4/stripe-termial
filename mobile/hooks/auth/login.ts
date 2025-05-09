import { useMutation } from "@tanstack/react-query";

import { LOGIN_ROUTE } from "@/constants/apiRoutes";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useRouter } from "expo-router";

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

export const useLogin = () => {
  const { setUser, setToken } = useCurrentUser();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await fetch(LOGIN_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      router.replace("/(tabs)");
    },
    onError: (err) => {
      // TODO: Handle error
      console.error("error", err);
    },
  });
};
