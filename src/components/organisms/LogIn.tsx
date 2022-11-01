import React, { useState } from "react";
import { Box, Grid, Typography, InputAdornment, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormTextField } from "@components/atoms/FormTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "src/schema/onboardingSchema";
import GoogleLogo from "@images/google.svg";

export const LoginSetup = ({ isDesktop }: { isDesktop: boolean }) => {
  const router = useRouter();
  const formInstance = useForm<{
    email?: string;
    password?: string;
  }>({
    resolver: yupResolver(SignInSchema),
  });
  const [adornmentMap, setAdornmentMap] = useState<{ [k: string]: any }>({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = formInstance;

  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    router.push("/onboarding");
  };

  const onBlur = (event: any) => {
    event.stopPropagation();
    const fieldName = event.target.name;
    trigger(fieldName);
    setAdornmentMap({ ...adornmentMap, [fieldName]: true });
  };

  const getAdornmentIcon = (field: "email" | "password") => {
    if (adornmentMap[field] && !errors[field]?.message)
      return (
        <InputAdornment position="end">
          <DoneIcon sx={{ color: "#1EC271" }} />
        </InputAdornment>
      );
    else return null;
  };

  return (
    <Grid container sx={{ background: "#f0f5f3" }}>
      <Grid
        sx={{
          background: "#f0f5f3",
          pl: isDesktop ? "156px" : "30px",
          pr: isDesktop ? "auto" : "30px",
          pt: "56px",
          height: "100vh",
        }}
        item
        md={8}
        xs={12}
      >
        <Box sx={{ maxWidth: "355px", mb: "30px" }}>
          <Typography
            sx={{
              fontSize: "32px",
              lineHeight: "2.5rem",
              mb: "8px",
              fontWeight: "500",
              color: "#012333",
            }}
          >
            Level up to find your next job with skapp’d!
          </Typography>
          <Typography sx={{ fontSize: "18px" }}>
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{ padding: "8px 10px", borderRadius: "30px", mb: "30px" }}
            startIcon={<GoogleLogo />}
          >
            Sign In with Google
          </Button>
          <Typography sx={{ color: "#012333", mb: "28px" }}>
            Or Sign In using your email
          </Typography>
          <Grid
            sx={{ flexDirection: "coloum", maxWidth: "456px", gap: "25px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormTextField
                field={{
                  name: "email",
                  label: "Email Address",
                  control: control,
                  options: {
                    autoFocus: true,
                    endAdornment: getAdornmentIcon("email"),
                    style: { mb: "24px" },
                  },
                  error: errors?.email,
                }}
                onBlur={onBlur}
                formInstance={formInstance}
              />
              <FormTextField
                field={{
                  name: "password",
                  label: "Password",
                  control: control,
                  error: errors?.password,
                  options: {
                    type: "password",
                    endAdornment: getAdornmentIcon("password"),
                    style: { mb: "24px" },
                  },
                }}
                onBlur={onBlur}
                formInstance={formInstance}
              />
              <Button
                variant="contained"
                sx={{ color: "#fff", mb: "25px", width: "100%", py: "8px" }}
                endIcon={<ArrowForwardIcon />}
                type="submit"
              >
                Let’s get started
              </Button>
            </form>
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              If you dont have an account please
              <Button href="/signup" sx={{ textTransform: "capitalize" }}>
                Sign Up
              </Button>
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid item md={4} xs={0}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            src="/images/login_banner.jpeg"
            alt="login banner image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Grid>
    </Grid>
  );
};
