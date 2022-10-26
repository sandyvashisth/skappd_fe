import styled from "@emotion/styled";
import { Button, Grid, Theme, useMediaQuery } from "@mui/material";

const StyledButton = styled(Button)(
  ({ isBackButton }: { isBackButton: boolean }) => ({
    backgroundColor: isBackButton ? "#fff" : "#1EC271",
    color: isBackButton ? "#1EC271" : "#fff",
    border: isBackButton ? "1px solid #1EC271" : "none",
    padding: "8px 22px",
  })
);

const StyledGrid = styled(Grid)(({ isDesktop }: { isDesktop: boolean }) => ({
  display: "flex",
  position: "fixed",
  bottom: 0,
  padding: "32px",
  justifyContent: "space-between",
  width: isDesktop ? "calc(100% - 264px)" : "100%",
  borderTop: isDesktop ? "none" : "1px solid #CEE0DB",
  zIndex: "1",
  right: 0,
  backgroundColor: "#DAE7E2",
}));

export const FormFooter = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <StyledGrid isDesktop={isDesktop}>
      <StyledButton type="reset" isBackButton>
        {`GO BACK`}
      </StyledButton>
      <StyledButton type="submit" isBackButton={false}>
        {`LET'S GO`}
      </StyledButton>
    </StyledGrid>
  );
};
