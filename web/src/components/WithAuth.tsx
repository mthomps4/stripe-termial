"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useEffect } from "react";

export const WithAuth = ({
  requiresAdmin,
  children,
}: {
  requiresAdmin?: boolean;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { user, token, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!token || !user) {
      router.push("/auth/login");
      return;
    }

    if (requiresAdmin && !user.is_admin) {
      router.push("/");
      return;
    }
  }, [token, user, router, requiresAdmin, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};
