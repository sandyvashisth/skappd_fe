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
import { ForgotPasswordSchema } from "src/schema/onboardingSchema";
import { useAuth } from "context/AuthContext";
import { AxiosError } from "axios";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { formatMultiErrors } from "@/src/helpers/error.helper";

const PasswordReset = () => {
  const router = useRouter();
  const formInstance = useForm<{
    email?: string;
  }>({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const [adornmentMap, setAdornmentMap] = useState<{ [k: string]: any }>({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = formInstance;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { passwordReset, isAuthenticated, loading } = useAuth();
  const [formError, setFormError] = useState<string>("");
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/onboarding");
    }
  }, [router, isAuthenticated]);

  const handleOnSubmit = async (formData: any) => {
    console.log("Form Data ===> ", formData);
  };

  const onBlur = (event: any) => {
    event.stopPropagation();
    const fieldName = event.target.name;
    trigger(fieldName);
    setAdornmentMap({ ...adornmentMap, [fieldName]: true });
  };

  const getAdornmentIcon = (field: "email") => {
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
            <Typography sx={{ color: "#012333", mb: "28px" }}>
              Please enter your email address to reset your account.
            </Typography>
            <FormHelperText sx={{ paddingBottom: 2 }} error={!!formError}>
              {formError as string}
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
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  sx={{ color: "#fff", mb: "25px", width: "100%", py: "8px" }}
                  endIcon={<ArrowForwardIcon />}
                  type="submit"
                >
                  Send Reset Link
                </LoadingButton>
              </form>
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

export default PasswordReset;
