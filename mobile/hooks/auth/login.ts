import { useMutation } from "@tanstack/react-query";
import { LOGIN_ROUTE } from "@/constants/apiRoutes";
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
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
}) => {
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
      onSuccess(data);
    },
    onError: (err) => {
      onError(err);
    },
  });
};
