import { SideBar } from "@components/layout/SideBar";

import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import { Theme, useMediaQuery } from "@mui/material";
import {
  onboarding_steps,
  progress_status,
  udpate_step,
} from "@state/onboarding";
import { useAtom } from "jotai";

import * as React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';

import { Box, Container, Grid, Typography } from '@mui/material';

import { AccountProfile } from '@components/layout/my_profile/account-profile.js';
import { AccountProfileDetails } from '@components/layout/my_profile/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';


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
  const { id: activeStepId }: { id: keyof typeof ONBOARDING_VIEW } = activeStep;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const View = ONBOARDING_VIEW[activeStepId] ?? null;
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Dashboard', 'My Profile', 'Notifications', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </div>
  );

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
