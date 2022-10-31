import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import GoogleLogo from "@images/google.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { useRouter } from "next/router";
import FormInputWithIcon from "@components/atoms/FormInputWithIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "src/schema/onboardingSchema";

export const SingUp = ({ isDesktop }: { isDesktop: boolean }) => {
  const router = useRouter();
  const formInstance = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const { control, handleSubmit } = formInstance;
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    router.push("/onboarding");
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
            Sign Up with Google
          </Button>
          <Typography sx={{ color: "#012333", mb: "28px" }}>
            Or Sign Up using your email
          </Typography>
          <Grid
            sx={{ flexDirection: "coloum", maxWidth: "456px", gap: "25px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputWithIcon
                field={{
                  name: "email",
                  label: "Email Address",
                  control: control,
                  options: { type: "email", autoFocus: true },
                }}
                formInstance={formInstance}
              />
              <FormInputWithIcon
                field={{
                  name: "password",
                  label: "Password",
                  control: control,
                  options: { type: "password" },
                }}
                formInstance={formInstance}
              />
              <FormInputWithIcon
                field={{
                  name: "cnfPassword",
                  label: "Confirm Password",
                  control: control,
                  options: { type: "password" },
                }}
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
              If you already have an account please
              <Button href="/login" sx={{ textTransform: "capitalize" }}>
                Log In
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
