import { SessionResponse } from "@/types/session";
import { getCurrentUser, getToken } from "@/utils/auth";
import { usePathname, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type CurrentUserContextType = {
  isLoading: boolean;
  user: SessionResponse["user"] | null;
  token: SessionResponse["token"] | null;
  setUser: (user: SessionResponse["user"] | null) => void;
  setToken: (token: SessionResponse["token"] | null) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  isLoading: true,
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<SessionResponse["user"] | null>(null);
  const [token, setToken] = useState<SessionResponse["token"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Initialize user and token from AsyncStorage on mount
    const initializeUser = async () => {
      const storedUser = await getCurrentUser();
      const storedToken = await getToken();

      setUser(storedUser);
      setToken(storedToken);
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  // Auth Permission Check
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    }

    if (user?.is_merchant && user.stripe_account_status !== "completed") {
      router.push("/connect-warning");
    }
  }, [user, router, isLoading, pathname]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CurrentUserContext.Provider
      value={{ user, token, setUser, setToken, isLoading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
