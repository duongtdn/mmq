"use strict"

import React, { useState, useEffect } from 'react'

import { formatTime } from '../../lib/date'

function Ads() {
  return (
    <div style={{height: '50px', width: '100%', background: '#aaa'}} />
  )
}

function TitleBar(props) {
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setElapsedTime(elapsedTime => elapsedTime + 1);
    }, 1000);
    return () => clearInterval(t);
  },[]);
  useEffect(() => {
    if (props.finish) {
      props.onFinish(elapsedTime);
      setElapsedTime(0);
    }
  },[props]);
  return (
    <div className="w3-bar w3-small">
      <div className="w3-bar-item w3-text-blue">
        <span > {props.num}/{props.total} </span>
      </div>
      <div className="w3-bar-item w3-right w3-text-yellow">
        <span > {formatTime(elapsedTime, {short: true})} </span>
      </div>
    </div>
  )
}

function Expression(props) {
  const arr = props.expr.split(' ').map(a => a.trim().replace('*','x'));
  return (
    <div className = "mali w3-xxxlarge bold text-center" style={{padding: '0'}}>
      {
        arr.map( (e, index) => (<label key = {index}> {e} </label>) )
      }
    </div>
  )
}

function AnswerBox(props) {
  const [answer, setAnswer] = useState('');
  const correct = props.correct;
  const answerBoxStyle = correct === undefined? '':
    correct? 'w3-pale-green w3-border-green w3-border-green' : 'w3-pale-red w3-border-red w3-border-red';
  return (
    <div style={{width: '270px', margin: '8px auto', textAlign: 'center'}}>
      <label className='w3-text-grey'>Answer</label>
      <label className={`text-input mali w3-round-xlarge w3-xlarge no-outline text-center ${answerBoxStyle}`} style={{position: 'relative', padding: 0}}>
        <label className = 'w3-xxlarge' style={{margin: '8px'}}> {answer} </label>
        <span className = 'w3-xxlarge w3-text-red' style={{position: 'absolute', padding: '0 6px 0 0', right: 0, bottom: '3px'}} onClick={e => setAnswer('')}> &times; </span>
      </label>
      <div className={correct?'w3-text-green':'w3-text-red'} style={{height: '20px'}}>
        {
          correct === undefined? null:
            correct? 'correct' : 'wrong'
        }
      </div>
      <div className = '' style={{margin: '16px 0'}}>
        <div>
          <div className = 'w3-cell-row pad-row'>
            <div className = 'w3-cell pad-num-container' style={{padding: '0 16px'}}>
              <div className = 'pad-num w3-ripple' onClick = {e => updateAnswer(0)}>
                0
              </div>
            </div>
            <div className = 'w3-cell w3-block pad-btn-wrapper' style={{textAlign: 'left'}}>
              <span className = 'pad-btn w3-block w3-blue w3-round-large' onClick={sendAnswer}>
                OK
              </span>
            </div>
          </div>
          <div className = 'w3-cell-row pad-row'>
            {
              [1,2,3].map(num => {
                return (
                  <div key = {num} className = 'w3-cell pad-num-container'>
                    <div className = 'pad-num w3-ripple' onClick = {e => updateAnswer(num)}>
                      {num}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className = 'w3-cell-row pad-row'>
            {
              [4,5,6].map(num => {
                return (
                  <div key = {num} className = 'w3-cell pad-num-container'>
                    <div className = 'pad-num w3-ripple' onClick = {e => updateAnswer(num)}>
                      {num}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className = 'w3-cell-row pad-row'>
            {
              [7,8,9].map(num => {
                return (
                  <div key = {num} className = 'w3-cell pad-num-container'>
                    <div className = 'pad-num w3-ripple' onClick = {e => updateAnswer(num)}>
                      {num}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
  function updateAnswer(num) {
    if (answer.length === 0 && num === 0) { return; }
    if (props.correct === false) {
      setAnswer(num);
      props.clear();
      return;
    }
    if (answer.length >= 9) { return; }
    setAnswer(`${answer}${num}`);
  }
  function sendAnswer() {
    if (answer.length === 0) { return; }
    props.updateAnswer(answer)
    .then( correct => {
      correct && setAnswer('');
    })
    .catch(err => console.log(err));
  }
}

export default function (props) {
  const [correct, setCorrect] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [finish, setFinish] = useState(false);
  const [animate, setAnimate] = useState(false);
  const quest = props.page.data.quest;
  return (
    <div>
      <Ads />

      <TitleBar
        num = {index}
        total = {quest.length}
        finish = {finish}
        onFinish = {showResult}
      />


      {
        [index].map(index => {
          return (
            <div key={index} className="flip-container">
              <div className={`flip-inner ${animate? 'animate-flip' : ''}`}>
                <div className="flip-front">
                  <Expression
                    expr = {quest[index]}
                  />
                </div>
                <div className="flip-back">
                  <Expression
                    expr = {index < quest.length-1? quest[index+1] : ''}
                  />
                </div>
              </div>
            </div>
          )
        })
      }

      <AnswerBox
        correct = {correct}
        updateAnswer = {evaluateAnswer}
        clear = {() => setCorrect(undefined)}
      />
    </div>
  );
  function evaluateAnswer(answer) {
    return new Promise((resolve, reject) => {
      const correctAnswer = eval(quest[index]);
      if (parseInt(answer) === parseInt(correctAnswer)) {
        setCorrect(true);
        (index < quest.length - 1) && setAnimate(true);
        setTimeout(() => {
          setCorrect(undefined);
          setAnimate(false);
          resolve(true);
          if (index < quest.length - 1) {
            setIndex(index => index + 1);
          } else {
            console.log('End quest. Collect time and Navigate to end result')
            setFinish(true);
          }
        }, 200);
      } else {
        setCorrect(false);
        resolve(false);
      }
    });
  }
  function showResult(elapsedTime) {
    console.log(`Time: ${elapsedTime}`);
    props.route.replace('result', { data: {elapsedTime} });
  }
}
