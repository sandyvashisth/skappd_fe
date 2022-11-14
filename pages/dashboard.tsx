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
import { Certifications } from '@components/layout/settings/certifications';
import { Skills } from '@components/layout/settings/skills';
import { Trophy } from '@components/layout/my_profile/Trophy';
import { StatisticsCard } from '@components/layout/my_profile/StatisticsCard';
import { WeeklyOverview } from '@components/layout/my_profile/WeeklyOverview'
import { TotalEarning } from '@components/layout/my_profile/TotalEarning'
import CardStatisticsVerticalComponent from '@components/molecules/card-statistics'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

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
                My Profile
              </Typography>
              {/* <Typography
                sx={{ mb: 3 }}
                variant="body2"
              >
                You can update your Profile and Job Preferences
              </Typography> */}
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
                  <Trophy />
                  {/* <AccountProfile /> */}
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <StatisticsCard />
                  {/* <Certifications /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <WeeklyOverview />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <TotalEarning />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Grid container spacing={6}>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats='$25.6k'
                        icon={<PollOutlinedIcon />}
                        color='success'
                        trendNumber='+42%'
                        title='Total Profit'
                        subtitle='Weekly Profit'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats='$78'
                        title='Refunds'
                        trend='negative'
                        color='secondary'
                        trendNumber='-15%'
                        subtitle='Past Month'
                        icon={<MonetizationOnOutlinedIcon />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats='862'
                        trend='negative'
                        trendNumber='-18%'
                        title='New Project'
                        subtitle='Yearly Project'
                        icon={<MonetizationOnOutlinedIcon />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardStatisticsVerticalComponent
                        stats='15'
                        color='warning'
                        trend='negative'
                        trendNumber='-18%'
                        subtitle='Last Week'
                        title='Sales Queries'
                        icon={<MonetizationOnOutlinedIcon />}
                      />
                    </Grid>
                  </Grid>
                </Grid>


              </Grid>
            </Container>
          </Box>

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
