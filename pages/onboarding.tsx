import { OnboardingTimeline } from "@components/molecules/OnboardingTimeline";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";

const ONBOARDING_VIEW = {
    login_setup: LoginSetup,
    personal_details: PersonalDetails,
    job_preferences: JobPreferences,
    setup_your_discipline: SetupYourDiscipline,
    education_certifications: EducationCertification,
    level_of_comfort: LevelOfComfort,
    location_preferences: LocationPreferences,
    benefits_priorities: BenefitsPriorities
}


const Onboarding = () => {
    return (<main>
        <ResponsiveAppBar />
        <Grid container>
            <Grid item sx={{ width: '264px', p: 2, flexDirection: 'column', display: { xs: 'none', md: 'flex' } }}>
                <Box sx={{ w: '200px', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Progress</Typography><Typography>Approx 5 min left</Typography></Box>
                    <LinearProgress sx={{ height: '8px', borderRadius: '4px' }} color="success" variant="determinate" value={50} />
                </Box>
                <Box>
                    <OnboardingTimeline />
                </Box>
            </Grid>
            <Grid item sx={{ backgroundColor: '#DAE7E2', flexGrow: 1, minHeight: "calc(100vh - 68px)", maxWidth: 'calc(100vw - 264px)' }}>
                <ONBOARDING_VIEW.job_preferences />
            </Grid>
        </Grid>
    </main>);
}

export default Onboarding;