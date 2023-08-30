import { v4 as uuidv4 } from "uuid";

const CountryInfo = ({ countryInformation }) => {
  // when the countryInformation object contain country information
  if (Object.keys(countryInformation).length !== 0) {
    const language = Object.values(countryInformation.languages).map((item) => (
      <li key={uuidv4()}>{item}</li>
    ));
    return (
      <section>
        <h2>{countryInformation.name}</h2>
        <p>Area {countryInformation.area}</p>
        <p>Capital</p>
        <ul>
          {countryInformation.capital.map((city) => (
            <li key={uuidv4()}>{city}</li>
          ))}
        </ul>
        <h3>Language:</h3>
        <ul>{language}</ul>
        <img
          className="country-flag-img"
          src={countryInformation.flags.svg}
          alt={countryInformation.flags.alt}
        />
      </section>
    );
  }
  return null;
};
export default CountryInfo;
