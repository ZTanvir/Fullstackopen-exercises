import { useEffect, useState } from "react";
import DisplayMessage from "./component/DisplayMessage";
import countyService from "./services/countrydata";
import "./index.css";

function App() {
  const [findCountry, setFindCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});

  // get all the countries available in the api
  useEffect(() => {
    countyService
      .getData("all")
      .then((data) => {
        const allCountries = data.map((item) => item.name.common);
        setCountries(countries.concat(allCountries));
      })
      .catch((error) => {
        console.log("Data not found");
      });
  }, []);

  // get single country data
  useEffect(() => {
    if (filterCountry.length === 1) {
      const country = filterCountry[0];
      countyService.getData(`name/${country}`).then((data) => {
        const coutryInfo = {
          name: data.name.common,
          capital: data.capital,
          area: data.area,
          languages: data.languages,
          flags: data.flags,
        };
        setCountryDetails(coutryInfo);
      });
    }
  }, [findCountry]);

  // Filter country based on user form value
  const filterCountry = countries.filter((country) => {
    if (findCountry !== "") {
      return country.toLowerCase().includes(findCountry.toLowerCase());
    }
  });

  //  Submit the form
  const searchCountry = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <form onSubmit={searchCountry}>
        <label>
          Find countries
          <input
            type="text"
            value={findCountry}
            name="search-country"
            onChange={(event) => setFindCountry(event.target.value)}
          />
        </label>
      </form>
      <section>
        <DisplayMessage
          matchCountry={filterCountry}
          countryDetails={countryDetails}
        />
      </section>
    </section>
  );
}
export default App;
