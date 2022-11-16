import styled from "@emotion/styled";
import { Button, Grid, Theme, useMediaQuery } from "@mui/material";
import { onboarding_steps, update_step } from "@state/onboarding";
import { useAtom } from "jotai";

const BackButton = styled(Button)`
  background-color: #fff;
  color: #1ec271;
  border: 1px solid
    ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.26)" : "#1ec271")};
  padding: 8px 22px;
`;
const NextButton = styled(Button)`
  background-color: #1ec271 !important;
  color: #fff;
  padding: 8px 22px;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 15px;
  z-index: 1;
  right: 0;
  background-color: #dae7e2;
  box-shadow: 0px -1px 0px rgb(30, 194, 113, 0.2);
`;

export const FormFooter = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [activeStepData, setActiveStep] = useAtom(update_step);
  const [allSteps] = useAtom(onboarding_steps);
  const { activeStep } = activeStepData;

  const onBackClick = () => {
    const { activeStepIndex } = activeStepData;
    const previousStepId = allSteps[activeStepIndex - 1].id;
    setActiveStep(previousStepId);
  };

  return (
    <StyledGrid
      sx={{
        width: isDesktop ? "calc(100% - 264px)" : "100%",
        borderTop: isDesktop ? "none" : "1px solid #CEE0DB",
        userSelect: "none",
        justifyContent:
          activeStep?.id === "personal_details" ? "end" : "space-between",
      }}
    >
      <BackButton
        type="reset"
        disabled={activeStep?.id === "personal_details"}
        sx={{
          display:
            activeStep?.id === "personal_details" ? "none" : "inline-flex",
        }}
        onClick={onBackClick}
      >{`GO BACK`}</BackButton>
      <NextButton type="submit">{`LET'S GO`}</NextButton>
    </StyledGrid>
  );
};
