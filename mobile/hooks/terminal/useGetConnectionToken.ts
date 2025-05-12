import { GET_CONNECTION_TOKEN_ROUTE } from "@/constants/apiRoutes";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { GetConnectionTokenResponse } from "@/types/terminal";
import { useQuery } from "@tanstack/react-query";

export function useGetConnectionToken() {
  const { token, user } = useCurrentUser();

  return useQuery<GetConnectionTokenResponse, Error>({
    queryKey: ["connection-token", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const response = await fetch(GET_CONNECTION_TOKEN_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get connection token");
      }
      return response.json();
    },
  });
}
