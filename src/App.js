
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

const WEATHER_API='https://api.openweathermap.org/data/2.5/weather?'

let KEY = process.env.REACT_APP_KEY

const GEOCODING_API ='https://api.openweathermap.org/geo/1.0/direct?'

const ICON_URL = 'https://openweathermap.org/img/wn/'

export const App= () => {
 
  const [location,setLocation]=useState('Lagos');
  const [latitude,setLatitude]=useState(null);
  const [longitude,setLongitude]=useState(null);
  const [weather,setWeather]= useState(null);
  const [inputValue,setInputValue] = useState('Select Location')
  const [icon,SetIcon] = useState()
  const [renderError,setError]= useState(false)
  const date = new Date();
  const dateString = date.toDateString();
  const timeString = date.toLocaleTimeString();
  
  // this is triggered when the user clicks on submit
  const onEnterOrClick = ()=>{
    setLocation(inputValue)   
  }

  // this is triggered on whem did user types in the user field
  const handleInputChange = (event)=>{
    setInputValue(event.target.value)
  }
  // this useeffect hook is used when data is fetched to get the latitiude and 
  // latitude with the geocoding api once the resonse is gotten it changes the 
  // state of location,latitude,longitude and Error if an exception is gotten 
  // it set error to false the use effect runs when location changes
  useEffect(
    function getPosition(){ 
      
      axios.get(`${GEOCODING_API}q=${location}&appid=${KEY}`)
      .then((response)=>{setLocation(response.data[0].name);
                          setLatitude(response.data[0].lat);
                          setLongitude(response.data[0].lon);
                          setError(false)
                        })
      .catch(()=>setError(true))
       }
    ,[location])
  
  // this useeffect is used to get the the weather condition base on the 
  // longitude and latitude of gotten from the goecoding_api
  // the usee effect runs when latitude and longitude changes
  useEffect(
    function getPosition(){ 
     
      axios.get(`${WEATHER_API}lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`)
      .then((response)=>{setWeather(response.data);SetIcon(response.data.weather[0].icon);setError(false);})
      .catch(()=>{setError(true);})
       }
    ,[latitude,longitude   ])

    // if renderError is true the component returns an error component else it returns weather details
      return (
        <div className="container">
          <section className='main'>
            {renderError === true ? <Error/> :  <div className='info-grid'>
            <span className='temp'>{weather === null ? ''  : Math.round(weather.main.temp)}<sup>o</sup></span>
            <span className='city_name'>
              {weather === null ? '': weather.name}
              {weather === null ? '': weather.sys.country}
              <span className='time_string'>{timeString}{dateString}</span>
            </span>
          
            <span className='weather_image'>
              <img src={`${ICON_URL}${icon}@2x.png`} alt='icon'/>
              <span className='weather_description'>{weather === null ? '':weather.weather[0].description}</span>
            </span>
            </div>}
          </section>
          <aside className='aside'>
            <div className='aside_container'>
              <div className='search_detail'>
                <Search onEnterOrClick={onEnterOrClick} handleInputChange={handleInputChange} inputValue={inputValue}/>
              </div>
              <div className='weather_extra'>
                <Weather temp={weather === null ? '': weather.main.temp} 
                humidity = {weather === null ?'':weather.main.humidity} 
                pressure={weather === null ?'':weather.main.pressure}
                wind = {weather === null ?'':weather.wind.speed}/>
              </div>
              </div>
           </aside>
        </div>
      )
 
}

// this component is rendered when theres a problem in fetching data
const Error = ()=>(
  <div className='error_div'>
    <img className='error_gif' src="https://media4.giphy.com/media/YVP9BiN356Oajs9R5J/giphy.gif?cid=ecf05e474dfdm8oaocxmxvwvvhvrp8f7xi01hu860ncno5xl&rid=giphy.gif&ct=s" alt='error_gif'/>
    <p>Cannot Find Location</p>
  </div>
)

const Search = ({onEnterOrClick,handleInputChange,inputValue})=> (
  <div className='search'>
    
      <input className='input' type='text' placeholder={inputValue} onChange={handleInputChange}/>
      <button className="button" onClick={onEnterOrClick} >search</button>
  
  </div>
)


const Weather = ({temp,humidity,pressure,wind})=>(
  <div className='weather_details'>
    <p>Weather Details</p>
    <div>
    <p>Temperature<span>{temp}<sup>o</sup>c</span></p>
    <p>Humidity<span>{humidity}%</span></p>
    <p>Pressure<span>{pressure}hpa</span></p>
    <p>wind<span>{wind}m/s</span></p>
    </div>
  </div>
)