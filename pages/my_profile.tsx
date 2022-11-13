import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import { Grid, Theme, useMediaQuery, Box, Container, Typography } from "@mui/material";
import {
  onboarding_steps,
  progress_status,
  udpate_step,
} from "@state/onboarding";
import { useAtom } from "jotai";

import * as React from 'react';
import PropTypes from 'prop-types';
import { SideBar } from "@components/layout/SideBar";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';

import { AccountProfile } from '@components/layout/my_profile/account-profile.js';
import { SettingsNotifications } from '@components/layout/settings/settings-notifications';

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

const Onboarding = (props) => {
  const [activeStepData, setActiveStep] = useAtom(udpate_step);
  const [allSteps] = useAtom(onboarding_steps);
  const [progressStatus] = useAtom(progress_status);
  const { activeStep }: { activeStep: any } = activeStepData;
  // const { id: activeStepId }: { id: keyof typeof ONBOARDING_VIEW } = activeStep;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  // const View = ONBOARDING_VIEW[activeStepId] ?? null;
  
  const { window } = props;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <main>
      <ResponsiveAppBar />
      <Grid container>
        <SideBar
          isDesktopView={isDesktop}
          container={container}
        />

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
              py: 8
            }}
          >
            <Container maxWidth="">
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                Account
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <AccountProfile />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <SettingsNotifications />
                </Grid>
              </Grid>
            </Container>
          </Box>


          <Button variant="outlined" onClick={handleClickOpen}>
            Open responsive dialog
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <PersonalDetails showFooter={false} />
              <DialogContentText>
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button> */}
            </DialogActions>
          </Dialog>

        </Grid>
      </Grid>
    </main>
  );
};

Onboarding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Onboarding;
