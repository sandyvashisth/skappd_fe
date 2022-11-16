import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TStep } from "src/constants/onboarding";

export const DefaultTimeline = ({
  steps,
  active,
  setActive,
}: {
  steps: TStep[];
  active: string;
  setActive: (id: string) => void;
}) => {
  return (
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
              <TimelineDot color={active === step.id ? "info" : undefined} />
            )}
            {index < steps.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent
            onClick={() => step.status !== "completed" && setActive(step.id)}
            sx={{
              pointerEvents: step.id === "login_setup" ? "none" : "auto",
              userSelect: "none",
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
  );
};
