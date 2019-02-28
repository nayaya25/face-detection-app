import React from 'react'
import "./Logo.css";
import Tilt from 'react-tilt'
import brain from './brain.png'

export default function (props) {
  return (
    <div className="na4 mt0 log">
      <div className="logostyle">
        <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }} style={{ height: 100, width: 100 }} >
          <div className="Tilt-inner pa3"><img className='App-logo' style={{ paddingTop: '5px' }}src={brain} alt="Brain Icon"/></div>
        </Tilt>
      </div>
    </div>
  )
}
