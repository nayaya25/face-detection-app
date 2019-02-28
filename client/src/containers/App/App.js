import React, { Component } from 'react';
import './App.css';
import Navigation from '../../components/Navigation/Navigation';
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm"
import Rank from '../../components/Rank/Rank'
import Logo from '../../components/Logo/Logo'
import Particles from 'react-particles-js';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';

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
      rank: 0,
      box: {}
    }
  }

  onInputChange = e => {
    this.setState({ input: e.target.value })
  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })
    
    sightengine.check(['face-attributes'])
      .set_url(this.state.imageUrl)
      .then(data => {
        this.updateFaceData(this.getFaceLocation(data))
      })
      .catch(err => console.log(err));
  }


  getFaceLocation = respData => {
      const face = respData.faces[0];
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: face.x1 * width,
        topRow: face.y1 * height,
        rightCol: width - (face.x2 * width),
        bottomRow: height - (face.y2 * height)
      }
  }

  updateFaceData = box => {
    this.setState({ box })
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
