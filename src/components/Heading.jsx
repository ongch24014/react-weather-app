import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const Heading = (props) => {
  return (
    <Stack
      className="heading"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Typography variant="h5">{props.text}</Typography>
      <Divider style={{ width: "100%" }} />
    </Stack>
  );
};
