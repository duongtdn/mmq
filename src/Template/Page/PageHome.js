"use strict"

import React, { useState } from 'react'

export default function (props) {
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  return (
    <div>
      <header style={{textAlign: 'center'}}>
        <h2 className="mali bold text-blue xxlarge" >Math Mad <br/> <span className="text-dark-grey">Quick</span></h2>
        <p className="mali small text-grey">
          Simple Math &hearts; Strengthen Brains &hearts; Do it quick
        </p>
      </header>

      <div style={{width: '230px', margin: '32px auto', textAlign: 'center'}}>
        <label className="xlarge">Your name</label>
        <input
          className="input-name mali round-xlarge xlarge no-outline"
          type='text'
          value={name}
          onChange = {handleInput}
        />
        <div className='text-red' style={{height: '20px'}}>
          {err}
        </div>
        <button className="btn-play no-outline" onClick={play}>
          <span>Play</span>
        </button>
      </div>
    </div>
  );
  function handleInput(e) {
    setErr('');
    setName(e.target.value);
  }
  function play() {
    if (name.length === 0) {
      setErr('Please enter your name')
    } else {
      props.route.navigate('play', { data: {name} })
    }
  }
}
