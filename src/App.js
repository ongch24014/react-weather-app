import './App.css';
import './light.css';
import axios from "axios";
import { Stack } from "@mui/material";
import { History } from './components/History';
import { SearchBar } from './components/SearchBar';
import { WeatherContextProvider } from './contexts/WeatherContext';
import { Weather } from './components/Weather';
import { Error } from './components/Error';
import { ThemeToggle } from './components/ThemeToggle';

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/weather";
function App() {
  return (
    <div>
      <WeatherContextProvider>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}>
          <ThemeToggle />
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
