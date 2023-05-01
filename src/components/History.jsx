import React from "react";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "react-responsive";

export const History = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 660px)" });
  const { history, remove, search, darkTheme } = useContext(WeatherContext);

  const mobileHistory = (data) => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        key={data.uid}
        className="history-stack-row"
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <p>
            {data.name}, {data.sys.country}
          </p>
          <p className="history-stack-datetime">{data.searchTime}</p>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <IconButton
            aria-label="search"
            size="small"
            sx={{ color: "#aaaaaa" }}
            className="history-stack-icon"
            onClick={() => search(data.name)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ color: "#aaaaaa" }}
            className="history-stack-icon"
            style={{ marginLeft: "10px" }}
            onClick={() => remove(data.name)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    );
  };

  const desktopHistory = (data) => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        key={data.uid}
        className="history-stack-row"
      >
        <p>
          {data.name}, {data.sys.country}
        </p>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <p className="history-stack-datetime">{data.searchTime}</p>
          <IconButton
            aria-label="search"
            size="small"
            sx={{ color: "#aaaaaa" }}
            className="history-stack-icon"
            onClick={() => search(data.name)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ color: "#aaaaaa" }}
            className="history-stack-icon"
            style={{ marginLeft: "10px" }}
            onClick={() => remove(data.name)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="start"
      spacing={2}
      className={(!darkTheme ? "light" : "") + " history-stack"}
    >
      <h3>Search History</h3>
      {history.length > 0 ? (
        history.map((data) =>
          isMobile ? mobileHistory(data) : desktopHistory(data)
        )
      ) : (
        <div>No data available. Let's search some weather!</div>
      )}
    </Stack>
  );
};
