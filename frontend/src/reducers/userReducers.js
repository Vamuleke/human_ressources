
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,PROFIL_SAVE_REQUEST,PROFIL_SAVE_SUCCESS,PROFIL_SAVE_FAIL, USER_SIGN_OUT, USERS_LIST_REQUEST, USERS_LIST_FAIL, USERS_LIST_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/constantsUser'
function userSigninReducer(state = {}, action) {
    switch (action.type) {
//login 
        case USER_SIGNIN_REQUEST:
            return { loading: true }
           
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
           
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGN_OUT:
            return{}
        default: return state


    }
  }

function userRegisterReducer(state = {}, action) {
      switch (action.type) {
        case USER_REGISTER_REQUEST:
          return { loading: true };
        case USER_REGISTER_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
      }
    
}

function profileDetailsReducer(state={users: []},action){
   
    switch (action.type) {
        case USERS_LIST_REQUEST:
        return {loading:true}
        case USERS_LIST_SUCCESS:
        return {loading:false, users:action.payload};
         
        case USERS_LIST_FAIL:
        return {loading:false,error:action.payload};
        
        default :
        return state;
    
    }
}
function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case PROFIL_SAVE_REQUEST:
        return { loading: true };
      case PROFIL_SAVE_SUCCESS:
        return { loading: false, userInfo: action.payload };
        
      case PROFIL_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
export {userSigninReducer,userUpdateReducer,profileDetailsReducer,userRegisterReducer}
