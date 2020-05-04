"use strict"

import React from 'react'

import { formatTime } from '../../lib/date'

export default function (props) {
  const elapsedTime = props.page.data.elapsedTime || 0;
  return (
    <div>
      <div style={{textAlign: 'center', margin: '64px 0'}}>
        <h2 className="mali w3-text-blue bold">Weldone! </h2>
        <p> <i className="fas fa-crown w3-text-yellow w3-xxxlarge" /> </p>
        <div className="mali w3-large" style={{margin: '32px 0 16px 0'}}>You made it in </div>
        <div className="mali w3-xxlarge w3-text-red bold">{formatTime(elapsedTime, {long: true})}</div>
        <hr />
        <button className="w3-button w3-blue" onClick = {e => props.route.replace('home')}>Back to Home</button>
      </div>
    </div>
  );
}
