import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export const Error = () => {
  const { error, setError } = useContext(WeatherContext);

  const closeError = () => {
    setError("");
  };

  return (
    <Snackbar
      open={error !== ""}
      autoHideDuration={5000}
      onClose={closeError}
      ClickAwayListenerProps={{ onClickAway: () => null }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={(props) => <Slide direction="up" {...props} />}
    >
      <MuiAlert
        onClose={closeError}
        severity="error"
        sx={{ width: "100%", bgcolor: "#7c0606", color: "#f1f1f1" }}
      >
        {error}
      </MuiAlert>
    </Snackbar>
  );
};
