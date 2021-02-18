
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGN_OUT } from '../constant/constantUser'
function userSigninReducer(state = {}, action) {
    switch (action.type) {
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
export {userSigninReducer}
