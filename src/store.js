import {createStore, applyMiddleware}from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {logger} from 'redux-logger'

//https://codesandbox.io/s/new-wr8ok
//ACTION TYPES
const INCREMENT='INCREMENT';
const DECREMENT='DECREMENT';
const START_STOP='START_STOP';
const RESET='RESET';
const COUNTDOWN_TIMER='COUNTDOWN_TIMER';
const STOP_TIMER='STOP_TIMER';

//ACTION CREATOR
export const increment=controller=>{
    return {type:INCREMENT, payload: controller}
}
export const decrement=controller=>{
    return {type:DECREMENT, payload:controller}
}
export const start_stop=()=>{
    return {type:START_STOP}
}
export const reset=()=>{
    return {type:RESET}
}
export const countDownTimer=()=>{
    return {type:COUNTDOWN_TIMER}
}
export const stopTimer=()=>{
    return {type: STOP_TIMER}
}

export const startTimer=()=>{
    return (dispatch, getState)=>{
       dispatch({type: START_STOP}) 

       let interval=setInterval(()=>{
        if(getState().stopInterval){
          clearInterval(interval)
          return dispatch({type: STOP_TIMER})
        }
        return dispatch(countDownTimer())    
}, 1000);
    }
}

//INITIAL STATE
const initialState={
    breakLength:5,
    sessionLength:25,
    minute:25,
    second: 0,
    isSession:true,
    stopInterval:true,
    timerON:false,
    timePause:true
}

//REDUCER
export const reducer=(state=initialState, action)=>{ 
    switch(action.type){
        case INCREMENT:
            if(action.payload === "session"){
                return {...state, 
                        sessionLength : state.sessionLength < 60 
                        ? state.sessionLength + 1 : state.sessionLength,
                        minute: state.sessionLength < 60 ? state.sessionLength + 1 : state.sessionLength
                       }
            }
            else{
                return {...state, breakLength : state.breakLength < 60 
                        ? state.breakLength + 1: state.breakLength}
            }
        case DECREMENT:  
        if(action.payload === "session"){
            return {...state, sessionLength : state.sessionLength > 1 
                              ? state.sessionLength - 1 : state.sessionLength, 
                              minute: state.sessionLength > 1 ? state.sessionLength - 1 : state.sessionLength}
        }
        else{
            return {...state, breakLength : state.breakLength > 1 
                              ? state.breakLength - 1 : state.breakLength}
        }
        case START_STOP: return {...state, 
                                  timerON: !state.timerON,
                                  stopInterval:!state.stopInterval,
                                  timePause: !state.timePause}
        case RESET: return {...initialState}
        case COUNTDOWN_TIMER: 
        {
            if(state.isSession){
                if(state.second > 0){
                    return {...state, second: state.second - 1, timerON:true, timePause:false}
                }
                else if(state.second === 0 && state.minute > 0){
                    return {...state, 
                            minute: state.minute - 1,
                            second: 59,
                            timerON: true
                          } 
                }
            }
            else{
                return {...state, 
                    isSession:false,
                    minute: state.breakLength - 1,
                    second: 59,
                    timerON: true
                  } 
            }
        }
        //   if(state.second > 0){
        //       return {...state, second: state.second - 1, timerON:true, timePause:false}
        //   }
        //   else if(state.second === 0 && state.minute > 0){
        //       return {...state, 
        //               minute: state.minute - 1,
        //               second: 59,
        //               timerON: true
        //              }
        //   }else{ 
        //      return {...state, stopInterval: false, isSession:false, timerON:true, 
        //                        minute: state.breakLength > 0 && state.second === 0 ? state.breakLength - 1 : state.breakLength, 
        //                        second: state.second === 0 ? 59 : state.second > 0 ? state.second - 1 : state.second}
        //   }
          case STOP_TIMER: return {...state, stopInterval: true, timerON:false, timePause: true}
         default: return state
    }
}

const store=createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));
store.subscribe(()=>console.log(store.getState()))

export default store;