"use strict"

import React, { useState } from 'react'

export default function (props) {
  // const [name, setName] = useState('');
  // const [err, setErr] = useState('');
  return (
    <div style = {{marginTop: '64px'}}>
      <header style={{textAlign: 'center'}}>
        <h2 className="mali bold w3-text-blue w3-xxlarge" >Math Mad <br/> <span className="text-dark-grey">Quick</span></h2>
        <p className="mali w3-small w3-text-grey">
          Simple Math <span className="w3-text-red">&hearts;</span> Strengthen Brains <span className="w3-text-red">&hearts;</span> Do it quick
        </p>
      </header>

      <div style={{width: '230px', margin: '32px auto', textAlign: 'center'}}>
        {/* <label className="xlarge">Your name</label>
        <input
          className="text-input mali w3-round-xlarge w3-xlarge no-outline"
          type='text'
          value={name}
          onChange = {handleInput}
        />
        <div className='w3-text-red' style={{height: '20px'}}>
          {err}
        </div> */}
        <button className="btn-play no-outline" onClick={play}>
          <span>Play</span>
        </button>
      </div>
    </div>
  );
  // function handleInput(e) {
  //   setErr('');
  //   setName(e.target.value);
  // }
  function play() {
    // if (name.length === 0) {
    //   setErr('Please enter your name')
    // } else {
    //   props.route.navigate('play', { data: {name} })
    // }
    const quest = [
      '15 - 5 * 2',
      '6 * 3',
      '15 + 7 * 10',
      '2 * 2 + 2'
    ];
    props.route.replace('play', { data: {quest} });
  }
}
