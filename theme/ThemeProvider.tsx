import { StyledEngineProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { themeCreator } from "./base";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const ThemeContext = createContext((_themeName: string): void => {});

import * as React from "react";

export interface ThemeProviderWrapperProps {
  children?: React.ReactNode | undefined;
}

export default function ThemeProviderWrapper(props: ThemeProviderWrapperProps) {
  const [themeName, _setThemeName] = useState("DefaultTheme");

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem("appTheme") || "DefaultTheme";
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };
  return (
    <ThemeContext.Provider value={setThemeName}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
}
