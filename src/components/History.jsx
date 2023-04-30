import React from "react";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const History = () => {
  const { history, remove, search } = useContext(WeatherContext);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="start"
      spacing={2}
      className="history-stack"
    >
      <h3>Search History</h3>
      {history.length > 0 ? (
        history.map((data) => (
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
              <p className="history-stack-datetime">{data.time}</p>
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
        ))
      ) : (
        <div>No data available. Let's search some weather!</div>
      )}
    </Stack>
  );
};
