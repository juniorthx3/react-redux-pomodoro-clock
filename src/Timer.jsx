import React from 'react'

const Timer= props => {
  return(
    <div className="timer">
       <h2 id="timer-label">{`${props.isSession === true ? 'Session' : 'Break'}`}</h2>
      <div className="timer-style">
        <span id="time-left">
                {`${props.minute < 10 
                  ? "0"+ props.minute 
                  : props.minute}:${props.second < 10 
                  ? "0" + props.second : props.second}`}
        </span>
      </div>
      <div>
        <button id="start_stop" onClick={()=>props.handleClick()}>
        {props.isRunning === false 
        ? <i className="fa fa-play" aria-hidden="true"></i>
        : <i className="fa fa-stop-circle-o"></i>}
        </button>
        <button id="reset" onClick={props.reset}>
          <i className="fa fa-refresh"></i>
        </button>
      </div>   
     </div>
    )
}

export default Timer
