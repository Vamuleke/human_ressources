import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import {
  profileDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  createAgentReducer,
  getAgentInfosReducer,
  getAgentSingleDetailsReducer,
} from "./reducers/agentRecucers";
import {
  getProjectInfosReducer,
  createProjectReducer,
  getProjectSingleDetailsReducer,
} from "./reducers/projectReducers";
import { getMessageReducers } from "./reducers/chatReducer";

// const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  updateProfil: userUpdateReducer,
  agentInfos: getAgentInfosReducer,
  userDetail: profileDetailsReducer,
  userRegister: userRegisterReducer,
  agentCreate: createAgentReducer,
  agentSingleDetails: getAgentSingleDetailsReducer,
  projectInfos: getProjectInfosReducer,
  createProject: createProjectReducer,
  projectSingleDetails : getProjectSingleDetailsReducer,
  // deleteProject: deleteProjectReducer,
  // updateProject : updateProjectReducer,
  getMessage: getMessageReducers,
});

const composeEnHancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnHancer(applyMiddleware(thunk))
);
export default store;
