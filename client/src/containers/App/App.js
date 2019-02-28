import React, { Component } from 'react';
import './App.css';
import Navigation from '../../components/Navigation/Navigation';
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm"
import Rank from '../../components/Rank/Rank'
import Logo from '../../components/Logo/Logo'
import Particles from 'react-particles-js';

var sightengine = require('sightengine')('1983977483', 'qq5asZMMo63qgQ7mu989');

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
        }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      isSignedIn: false,
      input: "",
      rank: 0
    }
  }

  onInputChange = e => {
    console.log(e.target.value)
  }

  onButtonSubmit = () => {
    console.log('Cliked')
    sightengine.check(['faces'])
      .set_url('https://d3m9459r9kwism.cloudfront.net/img/examples/example7.jpg')
      .then(function (result) {
      console.log(result)
    }).catch(function (err) {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      </div>
    );
  }
}

export default App;
