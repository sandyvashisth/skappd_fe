import { Router } from "next/router";
import type { FC, ReactElement } from "react";
import { useAuth } from "./AuthContext";

const unprotectedRoutes = ["/login", "/sign-up"];

export const isBrowser = () => typeof window !== "undefined";

export const ProtectRoute: FC<{ router: Router; children: ReactElement }> = ({
  router,
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();
  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  if (loading) {
    return null;
  }

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push("/login");
  }

  return children;
};
