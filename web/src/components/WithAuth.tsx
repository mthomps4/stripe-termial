"use client";

import { useRouter } from "next/navigation";
import { getToken, getCurrentUser } from "../utils/utils";

export const WithAuth = ({
  requiresAdmin,
  children,
}: {
  requiresAdmin?: boolean;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    router.push("/auth/login");
    return;
  }

  if (requiresAdmin && !user.is_admin) {
    router.push("/auth/login");
    return;
  }

  return children;
};
