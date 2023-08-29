import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getData = (resource) => {
  const request = axios.get(`${baseUrl}/${resource}`);
  return request.then((response) => response.data);
};

export default { getData };
