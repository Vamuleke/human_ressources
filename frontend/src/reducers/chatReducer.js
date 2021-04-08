import {
   
    CHAT_LIST_FAIL,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_REQUEST
  } from '../constants/constantsChat'
export function getMessageReducers(state={message: []},action){
   
    switch (action.type) {
        case CHAT_LIST_REQUEST:
        return {loading:true}
        case CHAT_LIST_SUCCESS:
        return {loading:false, message:action.payload};
         
        case CHAT_LIST_FAIL:
        return {loading:false,error:action.payload};
        
        default :
        return state;
    
    }
}