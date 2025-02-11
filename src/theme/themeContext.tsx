import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import { components } from "./components";
import { typography } from "./typography";

interface ThemeContextProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProviderComponent = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme") as "light" | "dark";
    if (storedMode) setMode(storedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    typography,
    components,
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
