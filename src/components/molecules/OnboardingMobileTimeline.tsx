import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, LinearProgress, Typography } from "@mui/material";
import { TStep } from "src/constants/onboarding";
import { DefaultTimeline } from "./DefaultTimeline";

//component styles
const styles = {
  headerWrapper: {
    p: 1,
    display: "flex",
    gap: "20px",
    width: "100%",
    alignItems: "center",
  },
  headingWrapper: {
    width: "65%",
    display: "flex",
    gap: "10px",
    alignItems: "baseline",
  },
  stepCounter: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "primary.main",
  },
  title: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#012333",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  linearProgress: {
    height: "8px",
    borderRadius: "4px",
    width: "35%",
  },
};

export const OnboardingMobileTimeline = ({
  steps,
  active,
  setActive,
}: {
  steps: TStep[];
  active: string;
  setActive: (id: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const totalSteps = steps.length;
  const activeStepIndex = React.useMemo(
    () => steps.findIndex(({ id }) => id === active),
    [active, steps]
  );

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    event.stopPropagation();
    setExpanded(isExpanded);
  };

  const handleTimelineChange = (timilineId: string) => {
    setActive(timilineId);
    setExpanded(false);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={styles.headerWrapper}>
          <Box sx={styles.headingWrapper}>
            <Typography sx={styles.stepCounter}>
              {`${activeStepIndex + 1}/${totalSteps}`}
            </Typography>
            <Typography sx={styles.title}>
              {steps[activeStepIndex]?.title}
            </Typography>
          </Box>
          <LinearProgress
            sx={styles.linearProgress}
            color="success"
            variant="determinate"
            value={
              steps.length /
              steps.filter((step) => step.status === "completed").length
            }
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <DefaultTimeline
          steps={steps}
          active={active}
          setActive={handleTimelineChange}
        />
      </AccordionDetails>
    </Accordion>
  );
};
