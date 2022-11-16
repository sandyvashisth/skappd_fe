import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import {
  Grid,
  Theme,
  useMediaQuery,
  Box,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import {
  onboarding_steps,
  progress_status,
  update_step,
} from "@state/onboarding";
import { useAtom } from "jotai";

import * as React from "react";
import PropTypes from "prop-types";
import { SideBar } from "@components/layout/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";

import { AccountProfile } from "@components/layout/my_profile/account-profile.js";
import { Certifications } from "@components/layout/settings/certifications";
import { Skills } from "@components/layout/settings/skills";
import { Trophy } from "@components/layout/my_profile/Trophy";
import { StatisticsCard } from "@components/layout/my_profile/StatisticsCard";
import { WeeklyOverview } from "@components/layout/my_profile/WeeklyOverview";
import { TotalEarning } from "@components/layout/my_profile/TotalEarning";
import CardStatisticsVerticalComponent from "@components/molecules/card-statistics";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import CardTwitter from "@components/layout/notifications/CardTwitter";
import CardFacebook from "@components/layout/notifications/CardFacebook";
import CardLinkedIn from "@components/layout/notifications/CardLinkedIn";

const drawerWidth = 264;

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

const Notification = () => {
  const [activeStepData, setActiveStep] = useAtom(update_step);
  const [allSteps] = useAtom(onboarding_steps);
  const [progressStatus] = useAtom(progress_status);
  const { activeStep }: { activeStep: any } = activeStepData;
  // const { id: activeStepId }: { id: keyof typeof ONBOARDING_VIEW } = activeStep;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  // const View = ONBOARDING_VIEW[activeStepId] ?? null;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const container = window !== undefined ? window.document.body : undefined;

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
      <Grid container>
        <SideBar isDesktopView={isDesktop} container={container} />

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
