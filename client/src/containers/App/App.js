import React, { Component } from 'react';
import './App.css';
import Navigation from '../../components/Navigation/Navigation';
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm"
import Rank from '../../components/Rank/Rank'
import Logo from '../../components/Logo/Logo'
import Particles from 'react-particles-js';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Signin from '../SignIn/Signin';
import Signup from '../SignUp//Signup';


var sightengine = require('sightengine')('1983977483', 'qq5asZMMo63qgQ7mu989');

class App extends Component {
  constructor() {
    super()
    this.state = {
      isSignedIn: false,
      input: "",
      rank: 0,
      box: {},
      route: 'signin'
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

  onRouteChange = (route) => {
    if (route === 'signout')
      this.setState({ isSignedIn: false })
    else if (route === 'home')
      this.setState({ isSignedIn: true })
    
  this.setState({ route: route })
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

  componentDidMount() {
    fetch('http://localhost:3001')
      .then(Response => console.log(Response.json()))
      .catch(error => console.log(error))
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ? <>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </> : (
            route === 'signin' ? <Signin onRouteChange={this.onRouteChange} /> : <Signup />
        )
        }
        <Particles
          className="particless"
          params={{
            particles: {
              number: {
                value: 130,
                density: {
                  enable: true,
                  value_area: 800
                }
              }
            }
          }} />
      </div>
    );
  }
}

export default App;
