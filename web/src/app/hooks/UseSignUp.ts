import { useMutation } from "@tanstack/react-query";
import { SIGNUP_URL } from "@/app/constants";
import { SignUpParams, SessionResponse } from "@/app/types/signup";

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SessionResponse) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation<SessionResponse, Error, SignUpParams>({
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
