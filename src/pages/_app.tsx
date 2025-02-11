/**
 * Application Entry Point
 */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { ThemeProviderComponent } from "../theme/themeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider theme={theme}>
    <ThemeProviderComponent>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProviderComponent>
    // </ThemeProvider>
  );
}
