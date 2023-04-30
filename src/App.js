import './App.css';
import axios from "axios";
import { Stack } from "@mui/material";
import { History } from './components/History';
import { SearchBar } from './components/SearchBar';
import { WeatherContextProvider } from './contexts/WeatherContext';
import { Weather } from './components/Weather';
import { Error } from './components/Error';

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/weather";
//TODO: light dark theme, No searched weather, store history in storage
// search time, background image if zoomed out, disaster
function App() {
  return (
    <div>
      <WeatherContextProvider>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}>

          <SearchBar />
          <Weather />
          <History />
          <Error />

        </Stack>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
