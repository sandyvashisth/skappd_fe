import { Box, LinearProgress, Typography } from "@mui/material";
import { TprogressStatus, TStep } from "src/constants/onboarding";
import { DefaultTimeline } from "./DefaultTimeline";

export const OnboardingDesktopTimeline = ({
  steps,
  active,
  setActive,
  progressStatus,
}: {
  steps: TStep[];
  active: string;
  setActive: (id: string) => void;
  progressStatus: TprogressStatus;
}) => {
  return (
    <>
      <Box sx={{ w: "200px", p: 2 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "8px" }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Progress
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Approx {progressStatus.remainingTime} min left
          </Typography>
        </Box>
        <LinearProgress
          sx={{ height: "8px", borderRadius: "4px" }}
          color="success"
          variant="determinate"
          value={progressStatus.progressPercent}
        />
      </Box>
      <Box>
        <DefaultTimeline steps={steps} active={active} setActive={setActive} />
      </Box>
    </>
  );
};
