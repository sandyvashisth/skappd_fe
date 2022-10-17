import { OnboardingTimeline } from "@components/molecules/OnboardingTimeline";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";


const Onboarding = () => {
    return (<main>
        <ResponsiveAppBar />
        <Grid container>
            <Grid item sx={{ width: '264px', p: 2, flexDirection: 'column', display: { xs: 'none', md: 'flex' } }}>
                <Box sx={{w: '200px', p: 2}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Progress</Typography><Typography>Approx 5 min left</Typography></Box>
                    <LinearProgress sx={{ height: '8px' }} color="success" variant="determinate" value={50} />
                </Box>
                <Box>
                <OnboardingTimeline />
                </Box>
            </Grid>
            <Grid sx={{ bgColor: '#DAE7E2' }}></Grid>
        </Grid>
    </main>);
}

export default Onboarding;