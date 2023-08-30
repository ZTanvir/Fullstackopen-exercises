import CountryInfo from "./CountryInfo";
import { v4 as uuidv4 } from "uuid";
import countyService from "../services/countrydata";
import { useState } from "react";

// display message based of country found
const DisplayMessage = ({ matchCountry, countryDetails }) => {
  const [showCountry, setShowCountry] = useState(null);
  const [showCountryData, setShowCountryData] = useState({});
  // Get country name and country details from api
  function showCountryInformation(event) {
    let countryName = event.target.parentElement.firstChild.nodeValue;
    countyService.getData(`name/${countryName}`).then((data) => {
      const coutryData = {
        name: data.name.common,
        capital: data.capital,
        area: data.area,
        languages: data.languages,
        flags: data.flags,
      };
      setShowCountryData({ ...coutryData });
    });
    setShowCountry(countryName);
  }
  // When more than 10 country match with the user input
  if (matchCountry.length > 10) {
    return `Too many matches,specify another filter`;
  } // When less than 10 country and more than 1 country match with the user input
  else if (matchCountry.length <= 10 && matchCountry.length > 1) {
    const matchCountries = matchCountry.map((country) => {
      return (
        <>
          <li key={uuidv4()}>
            {country}
            <button onClick={showCountryInformation}>show</button>
          </li>
          {/* When both name of country and country with the show boutton name match */}
          {country === showCountry ? (
            <CountryInfo countryInformation={showCountryData} />
          ) : null}
        </>
      );
    });
    return matchCountries;
  } else if (matchCountry.length === 1) {
    return <CountryInfo countryInformation={countryDetails} />;
  }
};
export default DisplayMessage;
