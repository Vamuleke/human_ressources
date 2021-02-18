import {createStore,combineReducers, applyMiddleware,compose} from 'redux';
import Cookie from "js-cookie";
import thunk from 'redux-thunk';
import {  userSigninReducer } from './reducers/userReducers';
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {userSignin:{userInfo}};
const reducer = combineReducers({
    userSignin:userSigninReducer,
})
const composeEnHancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(reducer,initialState,composeEnHancer(applyMiddleware(thunk)));
export default store;
