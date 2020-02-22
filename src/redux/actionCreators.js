import {INCREMENT, DECREMENT, START_STOP, RESET, SWITCH_BREAK, SWITCH_SESSION, STOP_TIMER} from './actionTypes'

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
}, 1000);
    }
}