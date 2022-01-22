import { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap"
import { format } from "date-fns";
import "./styles.scss"
import { Data } from "../../../interfaces/Data";

const Weather = () => {

  const [input, setInput] = useState('')
  const [data, setData] = useState<Data | null>(null)
  const apiKey = process.env.REACT_APP_API_KEY

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`)
      if(response.ok) {
        const data: Data = await response.json();
        setData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWeatherInfo()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])


  return (
    <div className="mt-3">
      <>
      <Col>
      <Form className='mb-4'>
          <Form.Group  controlId="formBasicEmail">
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
      { data === null ? (
        <div className="">
           <div className="weather-gradient" />
                <div  className="date-container1">
                <h2 className="date-dayname">Tuesday</h2>
                    <span className="date-day">{new Date().getFullYear()}</span>
                    <i className="location-icon" data-feather="map-pin" />
                    <span className="location">Düsseldorf</span>
                    <div className="precipitation mt-2">
                        {" "}
                        <span className="title">PRECIPITATION</span>
                        <span className="value">10 %</span>
                        <div className="clear" />
                    </div>
                    <div className="humidity">
                        {" "}
                        <span className="title">HUMIDITY</span>
                        <span className="value">9 %</span>
                        <div className="clear" />
                    </div>
                    <div className="wind">
                        {" "}
                        <span className="title">WIND</span>
                        <span className="value">34 km/h</span>
                        <div className="clear" />
                    </div>
                 </div>
                <div className="weather-container1">
                    <i className="weather-icon" data-feather="sun" />
                    <h1 className="weather-temp">4 °C</h1>
                    <h3 className="weather-desc">-</h3>
                </div>
        </div>
      ) : (
        <>
              <div className="weather-gradient" />
                <div  className="date-container1">
                    <h2 className="date-dayname">{format(new Date(data.timezone * 24), 'iii')}</h2>
                    <span className="date-day">{format(new Date(data.timezone / 365), 'dd MMM yyyy')}</span>
                    <i className="location-icon" data-feather="map-pin" />
                    <span className="location">{data.name}, {data.sys.country}</span>
                    <div className="precipitation mt-2">
                        {" "}
                        <span className="title ">PRECIPITATION </span>
                        <span className="value">{data.wind.deg} %</span>
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
                        <span className="value">{Math.round(data.main.feels_like - 273.15)}°C</span>
                        <div className="clear" />
                    </div>
                 </div>
                <div className="weather-container1">
                    <i className="weather-icon" data-feather="sun" />
                    <h1 className="weather-temp">{Math.round(data.main.temp - 273.15)}°C</h1>
                    <h3 className="weather-desc">{data.weather.map(w => w.main)}</h3>
                </div>
        </>
      )}
    </Col>
      </>
    </div>
  );
};

export default Weather;


// {coord: {lon: -0.1257, lat: 51.5085},…}
// base: "stations"
// clouds: {all: 67}
// cod: 200
// coord: {lon: -0.1257, lat: 51.5085}
// dt: 1639061017
// id: 2643743
// main: {temp: 280.91, feels_like: 278.34, temp_min: 279.33, temp_max: 282.19, pressure: 1001, humidity: 70}
// name: "London"
// sys: {type: 2, id: 2019646, country: "GB", sunrise: 1639036450, sunset: 1639065114}
// timezone: 0
// visibility: 10000
// weather: [{id: 803, main: "Clouds", description: "broken clouds", icon: "04d"}]
// wind: {speed: 4.12, deg: 240}