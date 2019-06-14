import React from 'react';
import './App.css';

import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = '655b7faf408b249215abc299bf71cbc2';

export default class App extends React.Component {

  state = {
    temperature:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    error:''
  }

  handleWeather = async (e) => {
     e.preventDefault();
     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
     const data = await api_call.json();

     if(city && country){
       this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
       });
     }
  }

  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 title_container">
                  <Titles />
                </div>
                <div className="col-sm-6 form_container">
                  <Form getWeather={this.handleWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
