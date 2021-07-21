import { LinearProgress } from '@material-ui/core';
import React from 'react';
import './App.css';
import WeatherWidget from './pages/WeatherWidget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    });
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <div className="App">
        {latitude === null ? <LinearProgress /> :
          <WeatherWidget location={{ latitude: latitude, longitude: longitude }} />
        }
      </div>
    );
  }
}



export default App