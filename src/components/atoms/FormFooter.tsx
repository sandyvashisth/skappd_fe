import styled from "@emotion/styled";
import { Button, Grid, Theme, useMediaQuery } from "@mui/material";

const BackButton = styled(Button)`
  background-color: #fff;
  color: #1ec271;
  border: 1px solid #1ec271;
  padding: 8px 22px;
`;
const NextButton = styled(Button)`
  background-color: #1ec271;
  color: #fff;
  padding: 8px 22px;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 32px;
  justify-content: space-between;
  z-index: 1;
  right: 0;
  background-color: #dae7e2;
  box-shadow: 0px -1px 0px rgb(30, 194, 113, 0.2);
`;

export const FormFooter = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <StyledGrid
      sx={{
        width: isDesktop ? "calc(100% - 264px)" : "100%",
        borderTop: isDesktop ? "none" : "1px solid #CEE0DB",
      }}
    >
      <BackButton type="reset">{`GO BACK`}</BackButton>
      <NextButton type="submit">{`LET'S GO`}</NextButton>
    </StyledGrid>
  );
};
