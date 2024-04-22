import React, { useState } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");
  const api_key = "80472c9f9dd24920f70688d6b92d9d23";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  let icon = weather && weather.weather && weather.weather[0].icon;
  let image = icon ? `http://openweathermap.org/img/w/${icon}.png` : "";
  const handleChange = (e) => {
    setCity(e.target.value);
  };
  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output);
        setError("");
      } else {
        setError("No data found.Please Enter a valid City Name");
        // console.log(error);
        setWeather();
      }
    } catch (error) {}
  }
  return (
    <div className="container">
      <div className="city">
        <input
          onChange={handleChange}
          value={city}
          type="text"
          placeholder="Enter your City Name"
        ></input>
        <button onClick={fetchData}>
          <FaSearch id="searchBtn"></FaSearch>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && weather.weather && (
        <div className="weatherData">
          <div className="weatherImg">
            <img id="wimg" src={image} alt="icon"></img>
          </div>
          <p>{weather.weather[0].main}</p>
          <p className="degrees">{weather.main.temp}°C</p>
          <p className="location">
            <FaLocationDot></FaLocationDot>
            {weather.name},{weather.sys.country}
          </p>
          <div className="details">
            <div className="windSpeed">
              <div className="windIcon">
                <WiStrongWind></WiStrongWind>
              </div>
              {weather.wind.speed}Km/h WIND SPEED
            </div>
            <div className="humidity">
              <div className="humidityIcon">
                <WiHumidity></WiHumidity>
              </div>
              {weather.main.humidity}% HUMIDITY
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
