import React from 'react'
import './FaceRecognition.css'
export default function FaceRecognition({ imageUrl, box }) {
  return (
      <div className='centre ma'>
        <div className="absolute mt2">
          <img id="inputImage" src={imageUrl} width='450px' height='auto' alt=" " />
          <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
          </div>
        </div>
    </div>
  )
}
