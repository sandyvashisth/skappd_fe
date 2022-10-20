import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, LinearProgress, Typography } from "@mui/material";
import { TStep } from "src/constants/onboarding";

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
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {steps.map((step, index) => (
            <TimelineItem key={step.id}>
              <TimelineSeparator>
                {step.status === "completed" && (
                  <CheckCircleIcon
                    sx={{
                      color: "green",
                      width: "16px",
                      height: "16px",
                      my: "10px",
                    }}
                  />
                )}
                {step.status === null && (
                  <TimelineDot
                    color={active === step.id ? "info" : undefined}
                  />
                )}
                {index < steps.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent
                onClick={() => setActive(step.id)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {step.title}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </>
  );
};
