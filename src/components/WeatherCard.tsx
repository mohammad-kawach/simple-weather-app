import { WeatherCardProps } from "../types/WeatherCardProps";

function WeatherCard(weather: WeatherCardProps) {
  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <h1 className="weather-icon">
        <img src={weather.current.condition.icon} alt="..." />
      </h1>
      <h2 className="temperature">{weather.current.temp_c}&deg;C</h2>
      <h3 className="location">{`${weather.location.country}/${weather.location.region}/${weather.location.name}`}</h3>
      <p className="description">{weather.current.condition.text}</p>
    </div>
  );
}

export default WeatherCard;
