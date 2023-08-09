import React, {useState} from 'react';

const api ={
  key: "54388267b25fd3c59873d1bba268c1cf",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setWeather(result)});
        setQuery('');
    }
  }

  /* Function that calculates the date. */
  const dateBuilder = (d) =>{
  /*Arrays holding the months and another holding the days */
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /*Sunday = 0, Monday = 1, ... ect */

  let day = days[d.getDay()]; /*Get weekday as a number (0-6)*/
  let date = d.getDate(); /*Get day as a number (1-31)*/
  let month = months[d.getMonth()]; /*	Get month as a number (0-11)*/

  let year = d.getFullYear(); /*Get year as a four digit number (yyyy)*/

  return `${day} ${date} ${month} ${year}`
  
  /*Returns formmated string with correct date*/
}

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp > 16) 
          ? 'app warm' 
          : 'app') 
          : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for a city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>

        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) :
        
        <div>
            <div className="greeting">
              <h1>Welcome to my Dynamic Weather App</h1>
              <h2>This app is designed to retrieve the current weather conditions by fetching data provided by OpenWeathers' Weather API </h2>
              <h3>To see the results, please use the search bar above.</h3>
              <h4>This is simple a demo project, for educational purposes.</h4>
            </div>

        </div>
        
        }
      </main>
    </div>
  );
}

export default App;
