import React from 'react'
import './style.css'

const TimerController = ({type, value, increment, decrement, isPlay}) => {
  return (
    <div className="component-container">
        <h2 id={`${type}-label`}>{type === 'break' ? 'Break ' : 'Session '}Length</h2>
        <div className="button-content">
            <button id={`${type}-decrement`} disabled={isPlay === true ? "disabled" : ""} onClick={decrement}><span className="fa fa-arrow-circle-left"></span></button>
            <p id={`${type}-length`}>{value}</p>
            <button id={`${type}-increment`} disabled={isPlay === true ? "disabled" : ""} onClick={increment}><span className="fa fa-arrow-circle-right"></span></button>
        </div>
    </div>
  )
}

export default TimerController