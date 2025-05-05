import { useMutation } from "@tanstack/react-query";

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpResponse {
  success: boolean;
  message?: string;
}

export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpParams>({
    mutationFn: async (data) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up");
      }

      return response.json();
    },
  });
};
