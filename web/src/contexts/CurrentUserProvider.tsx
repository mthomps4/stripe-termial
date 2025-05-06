"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getToken } from "../utils/utils";
import { SessionResponse } from "../types/signup";
import { usePathname, useRouter } from "next/navigation";

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
    // Initialize user and token from localStorage on mount
    const storedUser = getCurrentUser();
    const storedToken = getToken();

    setUser(storedUser);
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading || !user) return;

    if (user?.is_merchant && user.stripe_account_status !== "completed") {
      router.push("/stripe-onboarding");
    }
  }, [user, router, pathname, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ user, token, setUser, setToken, isLoading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
