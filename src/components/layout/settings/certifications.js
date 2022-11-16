import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Link,
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";

import { useTheme } from "@mui/material/styles";

import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const certifications = {
  certifications: "Board Certified in Gerontology - BCG",
  special_certification:
    "Specialty Certification in Feeding, Eating, and Swallowing SCFES or SCFES-A)",
  related_certifications: [
    "Assisted Technology Professional (ATP)",
    "Physical Agent Modalities (PAM)",
  ],
};

const skills = [
  { skill: "Amputee", experience: "2 years" },
  { skill: "IASTM", experience: "1 year" },
  { skill: "Strok", experience: "6 months" },
];

const active_licenses = ["Florida", "New York", "Oregon"];

export const ONBOARDING_VIEW = {
  personal_details: PersonalDetails,
  job_preferences: JobPreferences,
  setup_your_discipline: SetupYourDiscipline,
  education_certifications: EducationCertification,
  level_of_comfort: LevelOfComfort,
  location_preferences: LocationPreferences,
  benefits_priorities: BenefitsPriorities,
};

export const Certifications = (props) => {
  const [open, setOpen] = React.useState(false);

  const [displayView, setDisplayView] = React.useState(
    "education_certifications"
  );
  const View = ONBOARDING_VIEW[displayView];
  const handleClickOpen = (displayView) => {
    setDisplayView(displayView);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Manage Certifications, Special & Related Certifications"
          title="Certifications"
          action={
            <Button variant="outlined" color="primary" aria-label="settings">
              Edit <ModeOutlinedIcon variant="contained" />
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid
              item
              md={4}
              sm={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              xs={12}
            >
              <Tooltip title="Click to edit" arrow>
                <Typography color="textPrimary" gutterBottom variant="h6">
                  <Link
                    color="textPrimary"
                    underline="none"
                    onClick={() => handleClickOpen("location_preferences")}
                  >
                    Active Licenses
                  </Link>
                </Typography>
              </Tooltip>
              <List dense={true} aria-labelledby="basic-list-demo">
                {active_licenses.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              md={4}
              sm={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              xs={12}
            >
              <Tooltip title="Click to edit" arrow>
                <Typography color="textPrimary" gutterBottom variant="h6">
                  <Link
                    color="textPrimary"
                    underline="none"
                    onClick={() => handleClickOpen("education_certifications")}
                  >
                    Certifications
                  </Link>
                </Typography>
              </Tooltip>
              <List dense={true} aria-labelledby="basic-list-demo">
                <ListItem>
                  <ListItemText
                    primary="Certifications"
                    secondary={certifications.certifications}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Special Certifications"
                    secondary={certifications.special_certification}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Related Certifications"
                    secondary={certifications.related_certifications.join(", ")}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              md={4}
              sm={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              xs={12}
            >
              <Tooltip title="Click to edit" arrow>
                <Typography color="textPrimary" gutterBottom variant="h6">
                  <Link
                    color="textPrimary"
                    underline="none"
                    onClick={() => handleClickOpen("setup_your_discipline")}
                  >
                    Skills
                  </Link>
                </Typography>
              </Tooltip>
              <List dense={true} aria-labelledby="basic-list-demo">
                {skills.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.skill}
                      secondary={item.experience}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon variant="contained" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <View showFooter={false} />
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
      </Card>
    </form>
  );
};
