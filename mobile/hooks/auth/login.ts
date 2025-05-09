import { useMutation } from "@tanstack/react-query";

import { LOGIN_ROUTE } from "@/constants/apiRoutes";
import { SessionResponse } from "@/types/session";

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SessionResponse) => void;
  onError: (error: Error) => void;
}) => {
  console.log(LOGIN_ROUTE);
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
    onSuccess: onSuccess,
    onError: onError,
  });
};
