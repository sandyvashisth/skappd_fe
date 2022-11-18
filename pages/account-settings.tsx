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
import { Theme, useMediaQuery, Card, Button } from "@mui/material";
import {
  onboarding_steps,
  progress_status,
  update_step,
} from "@state/onboarding";
import { useAtom } from "jotai";

import * as React from "react";

import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";

import { Box, Container, Grid, Typography } from "@mui/material";

import { useState, useEffect } from "react";

// ** MUI Imports
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

import { Loader } from "@components/atoms/Loader";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";
import api from "services/api";
import { useToast } from "use-toast-mui";


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


const Onboarding = () => {
  const toast = useToast();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [router, isAuthenticated, loading]);

  const [activeStepData, setActiveStep] = useAtom(update_step);
  const [allSteps] = useAtom(onboarding_steps);
  const [progressStatus] = useAtom(progress_status);
  const { activeStep }: { activeStep: any } = activeStepData;
  const { id: activeStepId }: { id: keyof typeof ONBOARDING_VIEW } = activeStep;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const View = ONBOARDING_VIEW[activeStepId] ?? null;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const hash = "personal_details"; // router.asPath.split('#')[1];

  const [value, setValue] = useState(hash);
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    let requested_tab = router.asPath.split("#")[1];
    // setValue(requested_tab);

    getUserProfile()

  }, [hash, router]);

  const getUserProfile = async () => {
    let profile = await api.get("v1/profile");
    await api.get("v1/profile/notifications");
    setUserProfile(profile?.data?.data)
  }

  const requestForReview = async() => {
    try {
      let resp = await api.put("v1/profile", {
        user: {
          review_request: true
        },
      });
      setUserProfile(resp.data.data)
      localStorage.setItem("user", JSON.stringify(resp?.data?.data));
      toast.success("Review request has been submited");
    } catch (err: any) {
      toast.error(err?.message || err);
    }    
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Tab = styled(MuiTab)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      minWidth: 100,
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 67,
    },
  }));

  const TabName = styled("span")(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: "0.875rem",
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Dashboard", "My Profile", "Notifications", "Drafts"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  // const container = window !== undefined ? window.document.body : undefined;

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

              <Card>
                <TabContext value={value}>
                  <TabList
                    variant="scrollable"
                    onChange={handleChange}
                    aria-label="account-settings tabs"
                    sx={{
                      borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Tab
                      value="personal_details"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <AccountOutline /> */}
                          <TabName>Personal Details</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="job_preferences"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <FieldJobTitle /> */}
                          <TabName>Job Preferences</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="discipline_and_skills"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <Certificate /> */}
                          <TabName>Discipline & Skills</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="education"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <BookEducationOutline /> */}
                          <TabName>Education & Certification</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="comfort_settings"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <Skills /> */}
                          <TabName>Comfort Settings</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="location_preferences"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <AccountBoxMultiple /> */}
                          <TabName>Location Preferences</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="priorities"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <AccountBoxMultiple /> */}
                          <TabName>Priorities</TabName>
                        </Box>
                      }
                    />
                    <Tab
                      value="summary_resume"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {/* <AccountBoxMultiple /> */}
                          <TabName>Bio & Resume</TabName>
                        </Box>
                      }
                    />
                  </TabList>

                  <TabPanel sx={{ p: 0 }} value="personal_details">
                    <PersonalDetails showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="job_preferences">
                    <JobPreferences showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="discipline_and_skills">
                    <SetupYourDiscipline showFooter={false} />
                  </TabPanel>

                  <TabPanel sx={{ p: 0 }} value="education">
                    <EducationCertification showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="comfort_settings">
                    <LevelOfComfort showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="location_preferences">
                    <LocationPreferences showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="priorities">
                    <BenefitsPriorities showFooter={false} />
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="summary_resume">
                    <Box>
                      <Box sx={{ mx: 3, mt: 3 }}>
                        <h2>Comming Soon!</h2>
                      </Box>
                    </Box>
                  </TabPanel>
                </TabContext>                     
              </Card>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button disabled={userProfile?.review_request} onClick={() => requestForReview()} variant="outlined" type="submit">Request for Review</Button>
              </Grid>
              
            </Container>
          </Box>
        </Grid>
      </Grid>
      )}
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
