import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#232323",
    },
    primaryDark: {
      main: "#430e1d",
    },
    error: {
      main: "#f02a2a",
    },
    primaryGrey: {
      main: "#9f274470",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            fontWeight: 700,
            fontSize: "0.9rem",
          },
        },
      },
    },
  },
});
