import React from 'react'
import './ImageLinkForm.css'

export default function ImageLinkForm( { onInputChange, onButtonSubmit } ) {
  return (
    <div className="">
      <p className="f3 green">
      {'This Magic Brain will detect faces in your pictures. give it a try'}
      </p>
      <div className="centre">
        <div className="form centre pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            type="tex"
            className="f4 pa2 w-70 center" />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-green">Analyze</button>
        </div>
      </div>
      </div>
  )
}
 