"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useEffect } from "react";
import { ComponentType } from "react";

type WithAuthOptions = {
  requiresAdmin?: boolean;
};

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { user, token, isLoading } = useCurrentUser();
    const requiresAdmin = options.requiresAdmin;

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

    return <WrappedComponent {...props} />;
  };
}
