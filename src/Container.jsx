import React from 'react';
import './style.css'
import TimerController from './TimerController';
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement, reset, startTimer} from './store';
import Timer from './Timer';
//https://codesandbox.io/s/new-wr8ok
function Container() {
    const breakLength=useSelector(state=>state.breakLength)
    const sessionLength=useSelector(state=>state.sessionLength)
    let minute=useSelector(state=>state.minute)
    const second=useSelector(state=>state.second)
    let isSession=useSelector(state=>state.isSession)
    let timerON=useSelector(state=>state.timerON)
    const dispatch=useDispatch()
    
    return(
        <div className="container">
        <div className="clock-container">
          <h1>Pomodoro Clock</h1>
          <div className="all-component-content">
            <TimerController type='break' 
                             value={breakLength}
                             decrement={()=>dispatch(decrement('break'))}
                             increment={()=>dispatch(increment('break'))}
            />
            <TimerController type='session'
                             value={sessionLength} 
                             decrement={()=>dispatch(decrement('session'))}
                             increment={()=>dispatch(increment('session'))}
            />
          </div><br />
          <div>
           <Timer minute={minute}
                  second={second}
                  isSession={isSession}
                  timerON={timerON}
                  handleClick={()=>dispatch(startTimer())}
                  reset={()=>dispatch(reset())}
           />
          </div>
          <br />
        </div>
        </div>
      );
}

export default Container