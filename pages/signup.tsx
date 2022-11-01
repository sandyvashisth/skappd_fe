import React from "react";
import { SingUp } from "@components/organisms/SingUp";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { Theme, useMediaQuery } from "@mui/material";

const Login = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <main>
      <ResponsiveAppBar />
      <SingUp isDesktop={isDesktop} />
    </main>
  );
};

export default Login;
