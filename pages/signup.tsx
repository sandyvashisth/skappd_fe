import React from "react";
import { SingUp } from "@components/organisms/SingUp";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";

const Login = () => {
  return (
    <main>
      <ResponsiveAppBar />
      <SingUp />
    </main>
  );
};

export default Login;
