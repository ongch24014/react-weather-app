import axios from "axios";
import React from "react";
import { createContext, useState, useEffect } from "react";
import bgDark from "../assets/bg-dark.png";
import bgLight from "../assets/bg-light.png";

export const WeatherContext = createContext({});

export const WeatherContextProvider = ({ children }) => {
  const [weather, setWeather] = useState();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  // load data from local storage when app is first loaded
  useEffect(() => {
    const storedHistory = localStorage.getItem("storedHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const storedTheme = localStorage.getItem("storedTheme");
    if (storedTheme) {
      setDarkTheme(storedTheme === "true");
    } else {
      console.log("ueet");
      setDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = darkTheme
      ? `url(${bgDark})`
      : `url(${bgLight})`;
  }, [darkTheme]);

  // save data to local storage when component is unloaded
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log(darkTheme);
      localStorage.setItem("storedHistory", JSON.stringify(history));
      localStorage.setItem("storedTheme", darkTheme);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [history, darkTheme]);

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
      value={{
        weather,
        history,
        search,
        remove,
        error,
        setError,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
