import { createTheme, ThemeOptions } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import { typography } from "./typography";
import { components } from "./components";

// Function to get the theme mode from localStorage (default to "light")
const getStoredThemeMode = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  }
  return "light";
};

// Function to create theme based on mode
const getThemeOptions = (mode: "light" | "dark"): ThemeOptions => ({
  palette: mode === "dark" ? darkPalette : lightPalette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

// Create and export the theme dynamically
const theme = createTheme(getThemeOptions(getStoredThemeMode()));

export default theme;
