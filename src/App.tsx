import { createContext, useEffect, useState } from "react";
import TabButton from "./components/TabButton";
import WeatherCard from "./components/WeatherCard";
import { getIP } from "./utils/fetchIP.ts";
import { getCity } from "./utils/fetchCity.ts";
import fetchCurrentWeather from "./utils/fetchWeather.ts";
import Loader from "./components/Loader.tsx";
import { WeatherCardProps } from "./types/WeatherCardProps.ts";

const IPCityContext = createContext({});

function App() {
  const [loading, setLoading] = useState(true);
  const [IP, setIP] = useState("");
  const [city, setCity] = useState({});

  const [currentWeather, setCurrentWeather] = useState<WeatherCardProps>({
    location: {
      name: "",
      region: "",
      country: "",
      lat: 0,
      lon: 0,
      tz_id: "",
      localtime_epoch: 0,
      localtime: "",
    },
    current: {
      temp_c: 0,
      temp_f: 0,
      condition: {
        text: "",
        icon: "",
      },
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: "",
      humidity: 94,
    },
  });

  const fetchData = async () => {
    try {
      const mainIP = await getIP();
      setIP(mainIP);
      const mainCity = await getCity(mainIP);
      setCity(mainCity);
      console.log("IP : ", mainIP);
      console.log("City : ", mainCity);
      const weatherData = await fetchCurrentWeather(mainCity.city);
      console.log(weatherData);
      setCurrentWeather(weatherData); // Assign the fetched weather data to currentWeather
      console.log(IP, city);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching IP:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleRefresh() {
    setLoading(true);
    fetchData();
  }

  return (
    <IPCityContext.Provider value={currentWeather}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="weather-card text-center">
              <ul className="nav nav-tabs mb-3" role="tablist">
                <TabButton
                  id="current"
                  target="current"
                  label="Current"
                  isActive={true}
                />
                <TabButton
                  id="search"
                  target="search"
                  label="Search"
                  isActive={false}
                />
              </ul>
              <div className="tab-content d-flex align-items-center justify-content-center">
                {loading ? (
                  <Loader />
                ) : (
                  <WeatherCard {...currentWeather} /> // Display the WeatherCard component with data
                )}
              </div>
              <div className="input-group mt-3 d-grid">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleRefresh}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IPCityContext.Provider>
  );
}

export default App;
