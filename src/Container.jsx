import React, {useRef, useEffect} from 'react';
import './style.css'
import TimerController from './TimerController';
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement, reset, startTimer} from './store';
import Timer from './Timer';

function Container() {
    const breakLength=useSelector(state=>state.breakLength)
    const sessionLength=useSelector(state=>state.sessionLength)
    let minute=useSelector(state=>state.minute)
    const second=useSelector(state=>state.second)
    let isSession=useSelector(state=>state.isSession)
    let isRunning=useSelector(state=>state.isRunning)
    let isPaused=useSelector(state=>state.isPaused)
    const dispatch=useDispatch();
    const audio=document.getElementById('beep')
    const audioRef=useRef(null)
    useEffect(()=>{
      if(minute === 0 && second === 0){
        audio.play();
      }
    })

    const resetTimer=()=>{
      dispatch(reset())
      audio.currentTime = 0;
      audio.pause();
    }   
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
                  isRunning={isRunning}
                  isPaused={isPaused}
                  handleClick={()=>dispatch(startTimer())}
                  reset={()=>resetTimer()}
           />
          <audio id="beep" src="https://freesound.org/data/previews/153/153213_2499466-lq.mp3" ref={audioRef}></audio>
          
          </div>
          <br />
        </div>
        </div>
      );
}

export default Container