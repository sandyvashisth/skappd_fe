import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";

import { Grid, Theme, useMediaQuery, Box, Container, Typography, Divider } from "@mui/material";

import * as React from 'react';
import { useEffect } from "react";

import PropTypes from 'prop-types';
import { SideBar } from "@components/layout/SideBar";
import CardTwitter from '@components/layout/notifications/CardTwitter';

import { Loader } from "@components/atoms/Loader";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";


export const ONBOARDING_VIEW = {
  login_setup: LoginSetup,
  personal_details: PersonalDetails,
  job_preferences: JobPreferences,
  setup_your_discipline: SetupYourDiscipline,
  education_certifications: EducationCertification,
  level_of_comfort: LevelOfComfort,
  location_preferences: LocationPreferences,
  benefits_priorities: BenefitsPriorities,
};

const Notification = (props: any) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [router, isAuthenticated, loading]);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  
  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  const notifications = [
    {
      title: "Confirmation Email",
      message:
        "A confirmation email has been sent to your registered email, please check.",
      time: "2 Nov 2022 10.45 pm",
    },
    {
      title: "Profile Verification failed",
      message:
        "The uploaded resume seems incomplete, for better job reach please provide a valid resume.",
      time: "4 Nov 2022 10.45 pm",
    },
    {
      title: "Profile Verification Success",
      message: "Your Profile has been activated. Happy Job huntung!!.",
      time: "14 Nov 2022 10.45 pm",
    },
  ];

  return (
    <main>
      <ResponsiveAppBar />
      {loading ? (
        <Loader />
      ) : (
      <Grid container>
        <SideBar isDesktopView={isDesktop} />

        <Grid
          item
          xs
          sx={{
            backgroundColor: "#DAE7E2",
            minHeight: `calc(100vh - ${isDesktop ? "68px" : "104px"})`,
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container>
              <Typography sx={{ mb: 3 }} variant="h4">
                My Profile
              </Typography>
              <Typography sx={{ mb: 3 }} variant="body2">
                You can update your Profile and Job Preferences
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs>
                  <h2>Account Notifications</h2>
                  {notifications.map((notification, index) => (
                    <CardTwitter
                      key={index}
                      title={notification.title}
                      message={notification.message}
                      time={notification.time}
                    />
                  ))}
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs>
                  <h2>Job Notifications</h2>
                  {/* <CardFacebook /> */}
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs>
                  <h2>Payment Notifications</h2>
                  {/* <CardLinkedIn /> */}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
      )}
    </main>
  );
};

Notification.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Notification;
