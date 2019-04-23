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
      inputUrl: "",
      rank: 0,
      box: {},
      route: 'signup',
      user: {
        id: "",
        name: "User",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  onInputChange = e => {
    this.setState({ inputUrl: e.target.value })
  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })
    
    sightengine.check(['face-attributes'])
      .set_url(this.state.imageUrl)
      .then(data => {
        if (data) {
          fetch("http://localhost:3000/image", {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(resp => resp.json())
            .then(count => {
              this.setState({...this.state, entries: count})
            }).catch(
              //resp.status(400).json("Failed to update count")
              console.log('failed')
            )
        }
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

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
  }})
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
      .then(response => console.log(response.json()))
      .catch(error => console.log(error))
  
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ? <>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </> : (
            route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
