import axios from "axios";
const baseUrl = "http://api.weatherapi.com/v1";
const currentWeather = "/current.json";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getData = (cityName) => {
  const request = axios.get(
    `${baseUrl}${currentWeather}?key=${api_key}&q=${cityName}&aqi=no`
  );
  return request.then((response) => response.data);
};
const allData = (cityList) => {
  const endPoints = cityList.map(
    (city) => `${baseUrl}${currentWeather}?key=${api_key}&q=${city}&aqi=no`
  );
  const request = axios.all(endPoints.map((url) => axios.get(url)));
  return request.then((response) => response);
};
export default { getData, allData };
