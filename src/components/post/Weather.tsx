import { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import "./styles.scss";
import { Data } from "../../interfaces/WeatherData";

const Weather = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<Data | null>(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeatherInfo = async () => {
    if (input === "") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${apiKey}`
        );
        if (response.ok) {
          const data: Data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
        );
        if (response.ok) {
          const data: Data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [input]);

  return (
    <div className="mt-3 mb-5">
      <>
        <Col className="customInputDiv">
          <Form className="mb-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="customInput"
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search city for weather info..."
              />
            </Form.Group>
          </Form>
        </Col>
        <Col className="containerMod">
          {!input ? (
            data && (
              <>
                <div className="weather-gradient" />
                <div className="date-container1">
                  <h2 className="date-dayname">{new Date().getDate()}</h2>
                  <span className="date-day">{new Date().getFullYear()}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  <span className="location">
                    {data.name}, {data.sys.country}
                  </span>
                  <div className="precipitation mt-2">
                    {" "}
                    <span className="title ">PRECIPITATION </span>
                    <span className="value"> {data.wind.deg} %</span>
                    <div className="clear" />
                  </div>
                  <div className="humidity mt-1">
                    {" "}
                    <span className="title">HUMIDITY </span>
                    <span className="value">{data.main.humidity} %</span>
                    <div className="clear" />
                  </div>
                  <div className="wind mt-1">
                    {" "}
                    <span className="title">WIND </span>
                    <span className="value">{data.wind.speed} km/h</span>
                    <div className="clear" />
                  </div>
                  <div className="wind mt-1">
                    {" "}
                    <span className="title">FEELS LIKE </span>
                    <span className="value">
                      {Math.round(data.main.feels_like - 273.15)}°C
                    </span>
                    <div className="clear" />
                  </div>
                </div>
                <div className="weather-container1">
                  <i className="weather-icon" data-feather="sun" />
                  <h1 className="weather-temp">
                    {Math.round(data.main.temp - 273.15)}°C
                  </h1>
                  <h3 className="weather-desc">
                    {data.weather.map((w) => w.main)}
                  </h3>
                </div>
              </>
            )
          ) : (
            <>
              <div className="weather-gradient" />
              <div className="date-container1">
                <h2 className="date-dayname">{new Date().getDate()}</h2>
                <span className="date-day">{new Date().getFullYear()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <span className="location">
                  {data?.name}, {data?.sys?.country}
                </span>
                <div className="precipitation mt-2">
                  {" "}
                  <span className="title ">PRECIPITATION </span>
                  <span className="value"> {data?.wind?.deg} %</span>
                  <div className="clear" />
                </div>
                <div className="humidity mt-1">
                  {" "}
                  <span className="title">HUMIDITY </span>
                  <span className="value">{data?.main?.humidity} %</span>
                  <div className="clear" />
                </div>
                <div className="wind mt-1">
                  {" "}
                  <span className="title">WIND </span>
                  <span className="value">{data?.wind?.speed} km/h</span>
                  <div className="clear" />
                </div>
                <div className="wind mt-1">
                  {" "}
                  <span className="title">FEELS LIKE </span>
                  <span className="value">
                    {Math.round(data?.main?.feels_like! - 273.15)}°C
                  </span>
                  <div className="clear" />
                </div>
              </div>
              <div className="weather-container1">
                <i className="weather-icon" data-feather="sun" />
                <h1 className="weather-temp">
                  {Math.round(data?.main?.temp! - 273.15)}°C
                </h1>
                <h3 className="weather-desc">
                  {data?.weather.map((w) => w.main)}
                </h3>
              </div>
            </>
          )}
        </Col>
      </>
    </div>
  );
};

export default Weather;
