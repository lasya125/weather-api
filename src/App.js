import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);

  const eventHandler = (e) => {
    setCity(e.target.value);
  };

  const onSubmits = (e) => {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9581f6169da67ade2d8e54502b1ef2bd&units=metric`)
      .then(response => response.json())
      .then(data => {
        const dailyForecast = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        setForecast(dailyForecast);
      });
  };

  return (
    <div>
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={onSubmits}>
              <input
                t    ype="text"
                name="city"
                value={city}
                onChange={eventHandler}
                placeholder="Enter city name"
              /><br /><br />
              <input type="submit" value="Submit" />
            </form><br /><br />
          </div>
        </div>
      </center>
      <div className="arrangement">
        {forecast.map((data, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="card-title"></div>
              <h4>Day-{index + 1}: <h3>{data.main.temp}°C</h3></h4>
              <p>{data.weather[0].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;