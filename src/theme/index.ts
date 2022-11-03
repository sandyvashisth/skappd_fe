import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1EC271",
    },
    secondary: {
      main: "#9CFF2E",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: "#FFF !important",
          "& ::before": {
            borderColor: "green",
          },
          "&:focus": {
            background: "#FFF",
          },
          "&:hover": {
            background: "#FFF",
          },
        },
      },
    },
  },
});

export default theme;
