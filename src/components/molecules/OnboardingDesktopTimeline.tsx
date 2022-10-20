import { Box, LinearProgress, Typography } from "@mui/material";
import { TStep } from "src/constants/onboarding";
import { DefaultTimeline } from "./DefaultTimeline";

export const OnboardingDesktopTimeline = ({
  steps,
  active,
  setActive,
}: {
  steps: TStep[];
  active: string;
  setActive: (id: string) => void;
}) => {
  return (
    <>
      <Box sx={{ w: "200px", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Progress</Typography>
          <Typography>Approx 5 min left</Typography>
        </Box>
        <LinearProgress
          sx={{ height: "8px", borderRadius: "4px" }}
          color="success"
          variant="determinate"
          value={
            steps.length /
            steps.filter((step) => step.status === "completed").length
          }
        />
      </Box>
      <Box>
        <DefaultTimeline steps={steps} active={active} setActive={setActive} />
      </Box>
    </>
  );
};
