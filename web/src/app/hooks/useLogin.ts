import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { AUTH_TOKEN_KEY, LOGIN_URL, USER_KEY } from "../constants";

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

export function useLogin({ onError }: { onError: (error: Error) => void }) {
  const router = useRouter();
  const { setUser, setToken } = useCurrentUser();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      router.push("/");
    },
    onError: (error) => onError(error),
  });
}
