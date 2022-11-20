import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import GoogleLogo from "@images/google.svg";
import { Theme, useMediaQuery } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormTextField } from "@components/atoms/FormTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "src/schema/onboardingSchema";
import { SignInSchema } from "src/schema/onboardingSchema";
import { useAuth } from "context/AuthContext";
import { AxiosError } from "axios";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { formatMultiErrors } from "@/src/helpers/error.helper";

type SchemaKeys = keyof typeof yupSchema;

export const PAGES = {
  LOGIN: "login",
  SIGN_UP: "signup",
};

const yupSchema = {
  login: SignInSchema,
  signup: SignUpSchema,
};

export const SigningLayout = ({ page = "login" }: { page: SchemaKeys }) => {
  const router = useRouter();
  const formInstance = useForm<{
    email?: string;
    password?: string;
    cnfPassword?: string;
  }>({
    resolver: yupResolver(yupSchema[page]),
  });
  const [adornmentMap, setAdornmentMap] = useState<{ [k: string]: any }>({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = formInstance;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { createAccount, login, isAuthenticated, loading } = useAuth();
  const [signingError, setSigningError] = useState<string>("");
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/onboarding");
    }
  }, [router, isAuthenticated]);

  const handleOnSubmit = async (formData: any) => {
    console.log("Form Data ===> ", formData);
    setSigningError("");
    try {
      const onSubmit = page === PAGES.SIGN_UP ? createAccount : login;
      if (onSubmit) {
        await onSubmit(formData.email, formData.password, formData.cnfPassword);
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data) {
        const errorResponse = e.response?.data;
        if (errorResponse?.error) setSigningError(errorResponse.error);
        if (errorResponse?.errors)
          setSigningError(formatMultiErrors(errorResponse.errors));
      } else {
        setSigningError("Wrong email or password");
      }
    }
  };

  const onBlur = (event: any) => {
    event.stopPropagation();
    const fieldName = event.target.name;
    trigger(fieldName);
    setAdornmentMap({ ...adornmentMap, [fieldName]: true });
  };

  const getAdornmentIcon = (field: "email" | "password" | "cnfPassword") => {
    if (adornmentMap[field] && !errors[field]?.message)
      return (
        <InputAdornment position="end">
          <DoneIcon sx={{ color: "#1EC271" }} />
        </InputAdornment>
      );
    else return null;
  };

  return (
    <main>
      <ResponsiveAppBar />
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
              Sign Up with Google
            </Button>
            <Typography sx={{ color: "#012333", mb: "28px" }}>
              Or Sign Up using your email
            </Typography>
            <FormHelperText sx={{ paddingBottom: 2 }} error={!!signingError}>
              {signingError as string}
            </FormHelperText>
            <Grid
              sx={{ flexDirection: "coloum", maxWidth: "456px", gap: "25px" }}
            >
              <form onSubmit={handleSubmit(handleOnSubmit)}>
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
                    options: {
                      type: "password",
                      endAdornment: getAdornmentIcon("password"),
                      style: { mb: "24px" },
                    },
                    error: errors?.password,
                  }}
                  onBlur={onBlur}
                  formInstance={formInstance}
                />
                {page === PAGES.SIGN_UP && (
                  <FormTextField
                    field={{
                      name: "cnfPassword",
                      label: "Confirm Password",
                      control: control,
                      options: {
                        type: "password",
                        endAdornment: getAdornmentIcon("cnfPassword"),
                        style: { mb: "24px" },
                      },
                      error: errors?.password,
                    }}
                    onBlur={onBlur}
                    formInstance={formInstance}
                  />
                )}
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  sx={{ color: "#fff", mb: "25px", width: "100%", py: "8px" }}
                  endIcon={<ArrowForwardIcon />}
                  type="submit"
                >
                  Let’s get started
                </LoadingButton>
              </form>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Typography sx={{ color: "#012333", mb: "28px" }}>
                  {page == PAGES.SIGN_UP && !loading
                    ? "If you already have an account please"
                    : "If you dont have an account please"}
                  <Button
                    href={`/${
                      page == PAGES.SIGN_UP ? PAGES.LOGIN : PAGES.SIGN_UP
                    }`}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {page == PAGES.SIGN_UP ? "Log In" : "Sign Up"}
                  </Button>
                </Typography>
              </Box>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Typography sx={{ color: "#012333", mb: "28px" }}>
                  <Button
                    href="/password-reset"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Forgot Password ?
                  </Button>
                </Typography>
              </Box>
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
    </main>
  );
};
