const WeatherInfo = ({ weatherData }) => {
  const weatherDataSize = Object.keys(weatherData).length;
  if (weatherDataSize !== 0) {
    return (
      <section>
        <h3>Weather in {weatherData.name}</h3>
        <p>temperature {weatherData.temp_c}°c</p>
        <div className="weather-condition">
          <p>condition {weatherData.text}</p>
          <img
            src={weatherData.icon}
            alt={weatherData.text}
            title={weatherData.text}
          />
        </div>
        <p>wind speed {weatherData.wind_kph} kph</p>
      </section>
    );
  }
};
export default WeatherInfo;
