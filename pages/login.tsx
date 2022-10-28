import React from "react";
import { LoginSetup } from "@components/organisms/LogIn";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { Theme, useMediaQuery } from "@mui/material";

const Login = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <main>
      <ResponsiveAppBar />
      <LoginSetup isDesktop={isDesktop} />
    </main>
  );
};

export default Login;
