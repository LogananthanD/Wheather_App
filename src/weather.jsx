import React, { useState } from "react";
import axios from "axios";
import "./weather.css";
import video from "./assets/video2.mp4";

function Weather() {
  const [userInput, setUserInput] = useState("");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function inputChange(e) {
    setUserInput(e.target.value);
    console.log(userInput)
  }

  function result() {
    if (!userInput) {
      setErrorMessage("Please enter a city name");
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=1b83fd7bb9c608e55135518513a39eb2&units=metric`
      )
      .then((response) => {
        const data = response.data;

        setWeather(data.weather[0].main);
        setDescription(data.weather[0].description);
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setErrorMessage("");
        setUserInput("");
      })
      .catch((error) => {
        setErrorMessage("Please enter a correct city name");
        console.error("Error fetching the weather data", error);
      });
  }

  return (
    <div className="hero">
      <video autoPlay loop muted className="back-video">
        <source src={video} type="video/mp4" />
      </video>
      <div className="content">
        <h1 className="text-4xl font-medium mt-3">Weather Report</h1>
        <p>I can give you a weather report about your city!</p>
        <input
          value={userInput}
          onChange={inputChange}
          type="text"
          className="mt-2 border border-white rounded-md p-[6px] bg-transparent"
          placeholder="Enter city name"
        />
        <button onClick={result} className="border-white border-2 px-2 py-1 ml-4 rounded-lg">
          Get report
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <div className="flex justify-between p-4 mt-4 rounded-md bg-transparent">
          <div className="bg-transparent">
            <div className="bg-transparent p-4 ml-3"><h2 className="text-white">Weather: {weather}</h2></div>
          <div className="bg-transparent p-4 ml-3" ><h2 className="text-white">Temperature: {temperature} </h2></div></div>
          <div className="bg-transparent">
          <div className="bg-transparent p-4 "><h2 className="text-white">Humidity: {humidity} </h2></div>
          <div className="bg-transparent p-4 "> 
          <h2 className="text-white">Description: {description}</h2></div>
          </div>
          
         
        </div>
      </div>
    </div>
  );
}

export default Weather;
