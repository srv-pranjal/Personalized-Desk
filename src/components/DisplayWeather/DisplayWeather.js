import { useState, useEffect, useRef } from "react";
import axios from "axios";
import classNames from "classnames";
import { BallTriangle } from "react-loader-spinner";
import { useUserDetails } from "contexts";
import { TbEdit } from "react-icons/tb";
import "./DisplayWeather.css";

export const DisplayWeather = () => {
  const { userDetails, setUserDetails } = useUserDetails();
  const { city } = userDetails;
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState({
    icon: "a03d",
    temperature: "",
  });
  const [userCity, setUserCity] = useState(city);
  const [isLoading, setIsLoading] = useState(true);
  const [editCity, setEditCity] = useState(true);
  const inputRef = useRef();

  const setCityNameHandler = (cityName) => {
    localStorage.setItem(
      "USER",
      JSON.stringify({ ...userDetails, city: cityName })
    );
    setUserDetails((user) => ({
      ...user,
      city: cityName,
    }));
    setEditCity(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const API_URL = `https://api.weatherbit.io/v2.0/current?${
          city
            ? `city=${city}`
            : `lat=${coordinates.lat}&lon=${coordinates.lon}`
        }&key=${process.env.REACT_APP_API_KEY}`;

        if (city || coordinates.lat) {
          setIsLoading(true);
          const {
            data: { data },
          } = await axios.get(API_URL);

          setWeather({
            temperature: data[0].temp,
            icon: data[0].weather.icon,
          });
          setCityNameHandler(data[0].city_name);
          setUserCity(data[0].city_name);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [coordinates, city]);

  useEffect(() => {
    editCity && !isLoading && inputRef.current.focus();
  }, [editCity]);

  return (
    <div className={classNames("weather", { "weather--right": editCity })}>
      {isLoading ? (
        <div className="loader">
          <BallTriangle
            width="50"
            color="white"
            ariaLabel="loading-indicator"
          />
        </div>
      ) : (
        <>
          <div className="weather__temp">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
              width="50px"
              height="50px"
              alt="weather-icon"
              className="weather__icon"
            />
            {weather.temperature}°C
          </div>
          {editCity ? (
            <input
              className="weather__input"
              type="text"
              value={userCity}
              ref={inputRef}
              placeholder="Enter City Name"
              onChange={(e) => setUserCity(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && setCityNameHandler(userCity)
              }
            />
          ) : (
            <div className="weather__location">
              <p>{city}</p>
              <TbEdit
                className="weather__edit"
                onClick={() => setEditCity(true)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
