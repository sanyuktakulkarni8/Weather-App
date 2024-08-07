import React, { useEffect, useRef, useState } from 'react'
import './Weather.css';
import { FaSearch } from "react-icons/fa";

import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'




const Weather = () => {
    const inputRef=useRef();
    const[weatherData,setWeatherData]=useState(false);
    

    
    const search=async(city)=>{
        if(city===''){
            alert("pls enter city name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_ID}`;
            
            const res=await fetch(url);
            const data=await res.json();
            
            console.log(data);
            if(!res.ok){
                alert(data.message);
                return;
            }
            const icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,
            })
        }catch(err){
            setWeatherData(false);
            console.log('error in fetching weather data')
        }
    }

   useEffect(() => {
     
   search("Pune");
     
   }, [])
   
    
  
  
    return (
    <div className='weather'>
        <div className="searchbar">
            <input  ref={inputRef} type="text" placeholder='add loaction' />
            <FaSearch className='searchIcon' onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="icon" className='weather-img'/>
        <p className='temperature'>{weatherData.temperature} ° C</p>
        <p className='location'>{weatherData.location}</p>
        <hr/>

        <div className='col'>
        
        <div className="humidity">
            <img src={humidity} alt="icon" className='icon' />
            <p className='value'>{weatherData.humidity}%</p>
            <p className='name'>Humidity</p>

        </div>
        
        <div className="wind">
            <img src={wind} alt="wind-icon" className='icon' />
            <p className='value'>{weatherData.windSpeed}km/hr</p>
            <p className='name'>Wind</p>
        </div>
        </div>

        </>:
        <>
        <h1> Data not found</h1>
        </>}

        
   
    </div>
  )
}

export default Weather