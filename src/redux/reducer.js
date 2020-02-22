import {INCREMENT, DECREMENT, START_STOP, RESET, STOP_TIMER, SWITCH_BREAK, SWITCH_SESSION} from './actionTypes';



//INITIAL STATE
const initialState={
    breakLength:5,
    sessionLength:25,
    minute:25,
    second: 0, 
    isSession:true,
    isRunning:false,
    isPlay:false
}

//REDUCER
const reducer=(state=initialState, action)=>{ 
    switch(action.type){
        case INCREMENT:
            if(action.payload === "session"){
                return {...state, 
                        sessionLength : state.sessionLength < 60 
                        ? state.sessionLength + 1 : state.sessionLength,
                        minute: state.sessionLength < 60 ? state.sessionLength + 1 : state.sessionLength,
                        isPlay:false
                       }
            }
            else{
                return {...state, breakLength : state.breakLength < 60 
                        ? state.breakLength + 1: state.breakLength, isPlay:false}
            }
        case DECREMENT:  
        if(action.payload === "session"){
            return {...state, sessionLength : state.sessionLength > 1 
                              ? state.sessionLength - 1 : state.sessionLength, 
                              minute: state.sessionLength > 1 ? state.sessionLength - 1 
                              : state.sessionLength, isPlay:false}
        }
        else{
            return {...state, breakLength : state.breakLength > 1 
                              ? state.breakLength - 1 : state.breakLength, isPlay:false}
        }
        case START_STOP: return {...state, isRunning: !state.isRunning, isPlay:!state.isPlay}
        case RESET: return {...initialState}
        case STOP_TIMER: return {...state, isRunning:false, isPlay:false}
        case SWITCH_BREAK: 
          if(state.second > 0){
            return {...state, second: state.second - 1, isPlay:true}
        }
        else if(state.second === 0 && state.minute > 0){
            return {...state, minute: state.minute - 1, second: 59, isPlay:true}
        }else{ 
             return {...state, isSession:true, minute: state.sessionLength, isPlay:true}
        }
          case SWITCH_SESSION: 
          if(state.second > 0){
            return {...state, second: state.second - 1, isPlay:true}
        }
        else if(state.second === 0 && state.minute > 0){
            return {...state, minute: state.minute - 1, second: 59, isPlay:true}
        }else{ 
             return {...state, isSession:false, minute: state.breakLength, isPlay:true}
        }
          
         default: return state
    }
}

export default reducer;