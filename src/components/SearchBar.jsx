import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

export const SearchBar = () => {
  const { search } = useContext(WeatherContext);
  const [formState, setFormState] = useState({
    city: "",
    country: "",
  });

  const handleChange = (e, type) => {
    setFormState({
      ...formState,
      [type]: e.target.value,
    });
  };

  function searchLocation(e) {
    e.preventDefault();
    let location = "";
    if (formState.city) {
      location = formState.city;
    }

    if (formState.country) {
      // if city have no value
      if (location.length === 0) {
        location = formState.country;
      } else {
        location += `, ${formState.country}`;
      }
    }

    search(location);
  }

  return (
    <form onSubmit={searchLocation} style={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className="search-stack"
      >
        <input
          type="text"
          placeholder="City"
          value={formState.city}
          onChange={(e) => {
            handleChange(e, "city");
          }}
        />
        <input
          type="text"
          placeholder="Country"
          value={formState.country}
          onChange={(e) => {
            handleChange(e, "country");
          }}
        />

        <IconButton
          aria-label="delete"
          type="submit"
          disabled={!formState.city && !formState.country}
          sx={{ color: "white" }}
          variant="outlined"
          className="search-icon"
        >
          <SearchIcon />
        </IconButton>
      </Stack>
    </form>
  );
};
