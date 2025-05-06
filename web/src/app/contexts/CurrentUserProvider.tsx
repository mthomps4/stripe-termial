"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getToken } from "../utils/utils";
import { SessionResponse } from "../types/signup";

type CurrentUserContextType = {
  user: SessionResponse["user"] | null;
  token: SessionResponse["token"] | null;
  setUser: (user: SessionResponse["user"] | null) => void;
  setToken: (token: SessionResponse["token"] | null) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

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

  useEffect(() => {
    // Initialize user and token from localStorage on mount
    const storedUser = getCurrentUser();
    const storedToken = getToken();

    setUser(storedUser);
    setToken(storedToken);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
