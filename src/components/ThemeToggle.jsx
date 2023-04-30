import React from "react";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Stack } from "@mui/material";

export const ThemeToggle = () => {
  const { darkTheme, setDarkTheme } = useContext(WeatherContext);

  const change = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      className="theme-switch"
    >
      <DarkModeSwitch
        style={{ marginBottom: "2rem" }}
        checked={darkTheme}
        onChange={change}
        size={35}
        moonColor="grey"
        sunColor="orange"
      />
    </Stack>
  );
};
