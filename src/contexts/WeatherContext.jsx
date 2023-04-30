import axios from "axios";
import React from "react";
import { createContext, useState } from "react";

export const WeatherContext = createContext({});

export const WeatherContextProvider = ({ children }) => {
  const [weather, setWeather] = useState();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const search = (location) => {
    axios
      .get(`?q=${location}&units=metric&appid=20e916f3d37ffdc85157783d975b46e9`)
      .then(({ data }) => {
        const duplicate = history.find((x) => x.name === data.name);
        if (duplicate) {
          remove(data.name);
        }
        // get the country's current time
        const utc_seconds = data.dt + data.timezone;
        const date = new Date(utc_seconds * 1000);
        const dateOptions = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "UTC",
        };

        const formattedDate = date
          .toLocaleString("en-US", dateOptions)
          .replace(",", "")
          .replace(/\//g, "-")
          .toLowerCase();

        data.time = formattedDate;
        // generate random id for keys
        data.uid = Math.round(Math.random() * 1000);
        console.log(data);
        setWeather(data);
        setHistory((prev) => [data, ...prev]);
        setError("");
      })
      .catch((err) => {
        setError(
          `Whoops, ${err.response.data.message}. Please try again later.`
        );
      });
  };

  const remove = (location) => {
    const newHistory = history.filter((data) => data.name !== location);
    setHistory(newHistory);
  };

  return (
    <WeatherContext.Provider
      value={{ weather, history, search, remove, error, setError }}
    >
      {children}
    </WeatherContext.Provider>
  );
};