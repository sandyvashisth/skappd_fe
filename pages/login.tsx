import React, { useEffect } from "react";
import { LoginSetup } from "@components/organisms/LogIn";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";

const Login = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/onboarding");
    }
  }, [router, isAuthenticated]);

  return (
    <main>
      <ResponsiveAppBar />
      <LoginSetup isDesktop={isDesktop} />
    </main>
  );
};

export default Login;
