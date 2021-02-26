import { AGENT_CREATE_FAIL, AGENT_CREATE_REQUEST, AGENT_CREATE_SUCCESS, AGENT_INFOS_FAIL, AGENT_INFOS_REQUEST, AGENT_INFOS_SUCCESS } from "../constants/constantsAgent";

export const getAgentInfosReducer = (state = {loading : true}, action) => {
    switch (action.type) {
        case AGENT_INFOS_REQUEST :
            return {loading : true}
        case AGENT_INFOS_SUCCESS :
            return {loading : false, agent : action.payload}
        case AGENT_INFOS_FAIL :
            return {loading : false, error : action.payload}
        default :
            return state
    }
}

export const createAgentReducer = (state = {loading : true, agent : {}}, action) => {
    switch (action.type) {
        case AGENT_CREATE_REQUEST :
            return {loading : true}
        case AGENT_CREATE_SUCCESS :
            return {loading : false, agent : action.payload}
        case AGENT_CREATE_FAIL :
            return {loading : false, error : action.payload}
        default :
            return state
    }
}