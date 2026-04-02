import React, { useState, useEffect } from 'react'
import '../components/Weather.css'
const Whether = () => {
    
    const [Wdata,setWdata]=useState(null);
    useEffect(() => {
        getwhether();
    },[])
    function getwhether(){
        
    fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9719&longitude=77.5937&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,daylight_duration,uv_index_max&current=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,wind_direction_10m,surface_pressure,snowfall&timezone=auto&forecast_days=1")
    .then((res) => res.json())
    .then((data) => {
         console.log(data);
        setWdata(data)})
    .catch((err)=> console.log(err))

    }
   
  return (
    <>
    <div id="box1">
      <h2 className="title">Current Weather</h2>

      <div id="temp">
        {Wdata?.current?.temperature_2m}
        {Wdata?.current_units?.temperature_2m}
      </div>

      <div className="weatherDetails">
        <p><span>Time:</span> {Wdata?.current?.time}</p>
        <p><span>Latitude:</span> {Wdata?.latitude}</p>
        <p><span>Longitude:</span> {Wdata?.longitude}</p>
        <p><span>Timezone:</span> {Wdata?.timezone_abbreviation}</p>
        <p><span>Wind Speed:</span> {Wdata?.current?.wind_speed_10m} km/h</p>
        <p><span>Humidity:</span> {Wdata?.current?.relative_humidity_2m}%</p>
        <p><span>Pressure:</span> {Wdata?.current?.surface_pressure} hPa</p>
      </div>
    </div>
      
    </>
  )
}

export default Whether
