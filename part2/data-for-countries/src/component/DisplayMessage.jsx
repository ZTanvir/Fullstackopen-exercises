import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
import countyService from "../services/countrydata";
import weatherService from "../services/weatherData";
import WeatherInfo from "./weatherInfo";

// display message based of country found
const DisplayMessage = ({ matchCountry, countryDetails }) => {
  const [showCountry, setShowCountry] = useState(null);
  const [showCountryData, setShowCountryData] = useState({});
  const [capitalData, setCapitalData] = useState(null);

  // Get country details from api
  useEffect(() => {
    if (showCountry) {
      countyService.getData(`name/${showCountry}`).then((data) => {
        const coutryData = {
          name: data.name.common,
          capital: data.capital,
          area: data.area,
          languages: data.languages,
          flags: data.flags,
        };
        setShowCountryData({ ...coutryData });
      });
    }
  }, [showCountry]);
  // get weather data for a capital
  const getCapitalData = (capitalDataObj) => {
    if (Object.keys(capitalDataObj).length) {
      // if capital data has data in array convert it to null
      // so it will become empty,and this is remove previous search
      // capital data
      if (capitalData) {
        setCapitalData(null);
      }
      let allCapitalData = [];
      let selectedCapitalData = [];
      // get data for all the capital of a country
      weatherService.allData(capitalDataObj.capital).then((response) => {
        // store only data from the api response
        allCapitalData = response.map((data) => data.data);
        // store specific information from the all capital data
        allCapitalData.forEach((town) => {
          const capitalInfo = {
            name: town.location.name,
            temp_c: town.current.temp_c,
            text: town.current.condition.text,
            icon: town.current.condition.icon,
            wind_kph: town.current.wind_kph,
          };
          selectedCapitalData = selectedCapitalData.concat(capitalInfo);
        });
        setCapitalData([...selectedCapitalData]);
      });
    }
  };
  useEffect(
    () => {
      getCapitalData(countryDetails);
    },
    // if (Object.keys(countryDetails).length) {
    //   // if capital data has data in array convert it to null
    //   // so it will become empty,and this is remove previous search
    //   // capital data
    //   if (capitalData) {
    //     setCapitalData(null);
    //   }
    //   let allCapitalData = [];
    //   let selectedCapitalData = [];
    //   // get data for all the capital of a country
    //   weatherService.allData(countryDetails.capital).then((response) => {
    //     // store only data from the api response
    //     allCapitalData = response.map((data) => data.data);
    //     // store specific information from the all capital data
    //     allCapitalData.forEach((town) => {
    //       const capitalInfo = {
    //         name: town.location.name,
    //         temp_c: town.current.temp_c,
    //         text: town.current.condition.text,
    //         icon: town.current.condition.icon,
    //         wind_kph: town.current.wind_kph,
    //       };
    //       selectedCapitalData = selectedCapitalData.concat(capitalInfo);
    //     });
    //     setCapitalData([...selectedCapitalData]);
    //   });
    // }
    [countryDetails]
  );
  // get country with show button capital weather data when
  //click on the country with show button
  useEffect(() => {
    getCapitalData(showCountryData);
  }, [showCountryData]);
  // Get country name when click on the show button that is attach to the country
  function showCountryInformation(event) {
    let countryName = event.target.parentElement.firstChild.nodeValue;
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
            // render information for the country with show button
            <>
              <CountryInfo countryInformation={showCountryData} />
              {capitalData
                ? capitalData.map((data) => (
                    <WeatherInfo key={uuidv4()} weatherData={data} />
                  ))
                : null}
            </>
          ) : null}
        </>
      );
    });
    return matchCountries;
  } else if (matchCountry.length === 1) {
    return (
      <>
        <CountryInfo countryInformation={countryDetails} />
        {capitalData
          ? capitalData.map((data) => (
              <WeatherInfo key={uuidv4()} weatherData={data} />
            ))
          : null}
      </>
    );
  }
};
export default DisplayMessage;
