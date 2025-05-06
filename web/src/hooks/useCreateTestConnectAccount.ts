import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { CREATE_TEST_CONNECT_ACCOUNT_URL } from "@/constants";
import { ConnectOnboardingResponse } from "@/types/connectOnboarding";

export const useCreateTestConnectAccount = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: ConnectOnboardingResponse) => void;
  onError: (error: unknown) => void;
}) => {
  const { user, token } = useCurrentUser();

  return useMutation<ConnectOnboardingResponse, Error>({
    mutationFn: async () => {
      const response = await fetch(CREATE_TEST_CONNECT_ACCOUNT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create test connect account");
      }
      const data = await response.json();
      return data;
    },
    mutationKey: ["createTestConnectAccount", user?.id],
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
};
