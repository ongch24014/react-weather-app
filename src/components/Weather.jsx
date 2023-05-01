import { Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import cloud from "../assets/cloud.png";
import sun from "../assets/sun.png";

export const Weather = () => {
  const { weather, darkTheme } = useContext(WeatherContext);
  const [chipStyle, setChipStyle] = useState({
    chip: {
      bgcolor: "5a3dbd",
      color: "white",
    },
    icon: {
      color: "white",
    },
  });

  useEffect(() => {
    setChipStyle({
      chip: {
        bgcolor: darkTheme ? "#5a3dbd" : "#dbd0ff",
        color: darkTheme ? "white" : "#371c7e",
      },
      icon: {
        color: darkTheme ? "white" : "#371c7e",
      },
    });
  }, [darkTheme]);

  if (!weather) {
    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        className={(!darkTheme ? "light" : "") + " weather-stack no-weather"}
      >
        <h3>Today's Weather</h3>
        <p>No weather available. Start searching!</p>
      </Stack>
    );
  }

  const currWeather = Math.round(weather.main.temp) + "°";
  const minWeather = Math.round(weather.main.temp_min) + "°";
  const maxWeather = Math.round(weather.main.temp_max) + "°";
  const humidity = Math.round(weather.main.humidity) + "%";

  const isDayTime = () => {
    // If the current time falls between the hours of sunset and sunrise, there's a chance for the sun to make an appearance.
    if (weather.sys.sunset >= weather.dt && weather.sys.sunrise <= weather.dt) {
      return true;
    } else {
      return false;
    }
  };

  const weatherImg = isDayTime()
    ? weather.weather[0].description === "clear sky"
      ? sun
      : cloud
    : cloud;

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      className={(!darkTheme ? "light" : "") + " weather-stack"}
    >
      <p>
        {weather.name} , {weather.sys.country}
      </p>
      <h1 className="temperature">{currWeather}</h1>
      <Tooltip
        title={`Time in ${weather.name} when the temperature was taken`}
        placement="top"
      >
        <p className="time">{weather.time}</p>
      </Tooltip>
      <Stack direction="row" className="chip-stack" flexWrap="wrap">
        <Tooltip title="Max Temperature" placement="top">
          <Chip
            icon={<KeyboardDoubleArrowUpIcon sx={{ "&&": chipStyle.icon }} />}
            label={maxWeather}
            sx={chipStyle.chip}
          />
        </Tooltip>

        <Tooltip title="Min Temperature" placement="top">
          <Chip
            icon={<KeyboardDoubleArrowDownIcon sx={{ "&&": chipStyle.icon }} />}
            label={minWeather}
            sx={chipStyle.chip}
          />
        </Tooltip>

        <Tooltip title="Humidity" placement="top">
          <Chip
            icon={<WaterDropIcon sx={{ "&&": chipStyle.icon }} />}
            label={humidity}
            sx={chipStyle.chip}
          />
        </Tooltip>
      </Stack>
      <img src={weatherImg} alt="current weather" className="weather-img" />
    </Stack>
  );
};
