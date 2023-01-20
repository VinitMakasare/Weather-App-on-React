import React, { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";
import ('./tempapp.css')

const Tempapp = () => {
        const [searchValue, setSearchValue] = useState("Pune");
        const [tempInfo, setTempInfo] = useState('');

        const getWeatherInfo = async () => {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=154e9c15cca65a86b68ed2ae58f288b9`;

                let res = await fetch(url);
                let data  = await res.json();
// ------------------------------Object Destructuring----------------

                const {temp, humidity, pressure} = data.main;
                const {main:weathermood} = data.weather[0];
                const {name} = data;
                const {speed} = data.wind;
                const {country, sunset} = data.sys;

// -----------------------------Created Our Object--------------

                const myNewWeatherInfo = {
                    temp, 
                    humidity,
                    pressure,
                    weathermood,
                    name,
                    speed,
                    country,
                    sunset      
                }

                setTempInfo(myNewWeatherInfo);

                console.log(tempInfo);
                
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
            getWeatherInfo()
        },[]) 




    return (
        <><div className="wrap">
            <div className="search">
                <input type="search"
                    placeholder="search..."
                    autoFocus
                    id="search"
                    className="searchTerm"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)} />
                <button type="button" className="searchButton" onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        <WeatherCard tempInfo= {tempInfo}/>
        </>
    )
}

export default Tempapp;