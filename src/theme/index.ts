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
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          background: "#FFF !important",
          "&:focus": {
            background: "#FFF",
          },
          "&:hover": {
            background: "#FFF",
          },
          "& .MuiFormLabel-root": {
            paddingLeft: "12px",
            transform: "translate(0, 14px) scale(1)",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(0, 3.5px) scale(0.75)",
          },
        },
        input: {
          paddingLeft: "12px !important",
        },
      },
    },
  },
});

export default theme;
