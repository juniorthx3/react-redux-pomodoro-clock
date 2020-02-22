import {INCREMENT, DECREMENT, START_STOP, RESET, STOP_TIMER, SWITCH_BREAK, SWITCH_SESSION} from './actionTypes';



//INITIAL STATE
const initialState={
    breakLength:5,
    sessionLength:25,
    minute:25,
    second: 0, 
    isSession:true,
    isRunning:false,
}

//REDUCER
const reducer=(state=initialState, action)=>{ 
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
          case SWITCH_SESSION: 
          if(state.second > 0){
            return {...state, second: state.second - 1}
        }
        else if(state.second === 0 && state.minute > 0){
            return {...state, minute: state.minute - 1, second: 59}
        }else{ 
             return {...state, isSession:false, minute: state.breakLength}
        }
          
         default: return state
    }
}

export default reducer;