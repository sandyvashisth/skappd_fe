import { OnboardingDesktopTimeline } from "@components/molecules/OnboardingDesktopTimeline";
import { OnboardingMobileTimeline } from "@components/molecules/OnboardingMobileTimeline";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import { Grid, Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { steps } from "src/constants/onboarding";

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
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [activeStep, setActiveStep] =
    useState<keyof typeof ONBOARDING_VIEW>("personal_details");
  const View = ONBOARDING_VIEW[activeStep] ?? null;
  return (
    <main>
      <ResponsiveAppBar />
      <Grid container>
        {isDesktop ? <Grid
          item
          sx={{
            width: "264px",
            p: 2,
            flexDirection: "column",
          }}
        >
          <OnboardingDesktopTimeline
            steps={steps}
            active={activeStep}
            setActive={(value) =>
              setActiveStep(value as keyof typeof ONBOARDING_VIEW)
            }
          />
        </Grid> :
          <Grid
            item
            sx={{
              width: "100%",
              flexDirection: "column",
            }}
          >
            <OnboardingMobileTimeline
              steps={steps}
              active={activeStep}
              setActive={(value) =>
                setActiveStep(value as keyof typeof ONBOARDING_VIEW)
              }
            />
          </Grid>}

        <Grid
          item
          xs
          sx={{
            backgroundColor: "#DAE7E2",
            minHeight: `calc(100vh - ${isDesktop? '68px' : '104px'})`,
          }}
        >
          <View />
        </Grid>
      </Grid>
    </main>
  );
};

export default Onboarding;
