import { createContext, useEffect, useState } from "react";
import TabButton from "./components/TabButton";
import WeatherCard from "./components/WeatherCard";
import { getIP } from "./utils/fetchIP.ts";
import { getCity } from "./utils/fetchCity.ts";
import fetchCurrentWeather from "./utils/fetchWeather.ts";
import Loader from "./components/Loader.tsx";
import { WeatherCardProps } from "./types/WeatherCardProps.ts";
import CustomCalendar from "./components/CustomCalendar.tsx";
import Search from "./components/Search.tsx";

const IPCityContext = createContext({});

function App() {
  const [currentTab, setCurrentTab] = useState(true);
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
      // console.log("IP: ", mainIP);
      // console.log("City: ", mainCity);
      const weatherData = await fetchCurrentWeather(mainCity.city);
      // console.log(weatherData);
      setCurrentWeather(weatherData);
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

  function handleSearch() {
    console.log("Searching ...");
  }

  function toggleCurrent() {
    setCurrentTab((oldState) => !oldState);
  }

  useEffect(() => {
    console.log("Current tab: ", currentTab);
  }, [currentTab]);

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
                  isActive={currentTab}
                  onClick={toggleCurrent}
                />
                <TabButton
                  id="search"
                  target="search"
                  label="Search"
                  isActive={!currentTab}
                  onClick={toggleCurrent}
                />
              </ul>
              <div className="tab-content d-flex align-items-center justify-content-center">
                {loading ? (
                  <Loader />
                ) : currentTab ? (
                  <WeatherCard {...currentWeather} />
                ) : (
                  <div className="d-grid">
                    <div className="grid-container">
                      <CustomCalendar />
                      <Search />
                    </div>
                  </div>
                )}
              </div>
              <div className="input-group mt-3 d-grid">
                {currentTab ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleRefresh}
                  >
                    Refresh
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IPCityContext.Provider>
  );
}

export default App;
