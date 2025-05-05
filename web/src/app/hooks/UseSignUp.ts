import { useMutation } from "@tanstack/react-query";
import { SIGNUP_URL } from "../constants";

interface SignUpParams {
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    merchant_attributes: {
      first_name: string;
      last_name: string;
    };
  };
}

interface SignUpResponse {
  success: boolean;
  message?: string;
  user: unknown;
  token: string;
}

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SignUpResponse) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation<SignUpResponse, Error, SignUpParams>({
    mutationFn: async (data) => {
      const response = await fetch(SIGNUP_URL, {
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
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
};
