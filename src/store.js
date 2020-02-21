import {createStore, applyMiddleware}from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {logger} from 'redux-logger'

//ACTION TYPES
const INCREMENT='INCREMENT';
const DECREMENT='DECREMENT';
const START_STOP='START_STOP';
const RESET='RESET';
const COUNTDOWN_TIMER='COUNTDOWN_TIMER';
const STOP_TIMER='STOP_TIMER';
const SWITCH_BREAK='SWITCH_BREAK';
const SWITCH_SESSION='SWITCH_SESSION';

//ACTION CREATOR
export const increment=controller=>{
    return {type:INCREMENT, payload: controller}
}
export const decrement=controller=>{
    return {type:DECREMENT, payload: controller}
}
export const start_stop=()=>{
    return {type:START_STOP}
}
export const reset=()=>{
    return {type:RESET}
}
export const switchBreak=()=>{
    return {type: SWITCH_BREAK}
}
export const switchSession=()=>{
    return {type: SWITCH_SESSION}
}


export const startTimer=()=>{
    return function (dispatch, getState){
       dispatch({type: START_STOP}) 

       let interval=setInterval(()=>{
        if(!getState().isRunning){
          clearInterval(interval)
          return dispatch({type: STOP_TIMER})
        }
        if(getState().isSession){
            dispatch({type: SWITCH_SESSION})
        }
        else{
            dispatch({type: SWITCH_BREAK})
        }
        // dispatch({type: COUNTDOWN_TIMER})
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
    isRunning:false,
    audio: 'https://freesound.org/data/previews/153/153213_2499466-lq.mp3'
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
        case START_STOP: return {...state, isRunning: !state.isRunning}
        case RESET: return {...initialState}
        case COUNTDOWN_TIMER: 
          if(state.second > 0){
              return {...state, second: state.second - 1}
          }
          else if(state.second === 0 && state.minute > 0){
              return {...state, minute: state.minute - 1, second: 59}
          }else{ 
               return {...state, isSession:false}
          }
          case STOP_TIMER: return {...state, isRunning:false}
          case SWITCH_BREAK: 
          if(state.second > 0){
            return {...state, second: state.second - 1}
        }
        else if(state.second === 0 && state.minute > 0){
            return {...state, minute: state.minute - 1, second: 59}
        }else{ 
             return {...state, isSession:true, minute: state.sessionLength}
        }
          //return {...state, isSession:false, isRunning:true, minute: state.breakLength}
          case SWITCH_SESSION: 
          if(state.second > 0){
            return {...state, second: state.second - 1}
        }
        else if(state.second === 0 && state.minute > 0){
            return {...state, minute: state.minute - 1, second: 59}
        }else{ 
             return {...state, isSession:false, minute: state.breakLength}
        }
          
          
          //return {...state, isSession:true, isRunning:true, minute: state.sessionLength}
         default: return state
    }
}

const store=createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));
store.subscribe(()=>console.log(store.getState()))

export default store;