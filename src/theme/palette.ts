import { grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles";

// Light Theme Palette
export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#02859A",
    light: "#BAE2E8",
    dark: "#076577",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9A6F02",
    light: "#E8CAB2",
    dark: "#775502",
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff",
    paper: grey[50],
  },
  text: {
    primary: grey[900],
    secondary: grey[700],
  },
};

// Dark Theme Palette
export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#02859A",
    light: "#BAE2E8",
    dark: "#076577",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9A6F02",
    light: "#E8CAB2",
    dark: "#775502",
    contrastText: "#ffffff",
  },

  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: grey[400],
  },
};
