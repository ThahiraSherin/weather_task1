import React from 'react'

const WeatherCard = ({data}) => {
  return (
    <div className='border p-3 rounded shadow'>
      <h2 className='font-bold'>{data.name}</h2>
      <p>Temp : {data.main?.temp}°C</p>
      <p>Humidity: {data.main?.humidity}%</p>
    </div>
  )
}

export default WeatherCard;
