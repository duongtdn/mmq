"use strict"

import React from 'react'

export default function (props) {
  return (
    <div>
      <h3>Weldone! Your time is {props.page.data.elapsedTime} </h3>
      <button className="w3-button w3-blue" onClick = {e => props.route.replace('home')}>Back to Home</button>
    </div>
  );
}
