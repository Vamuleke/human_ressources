import { AGENT_CREATE_FAIL, AGENT_CREATE_REQUEST, AGENT_CREATE_SUCCESS, AGENT_DELETE_FAIL, AGENT_DELETE_SUCCESS, AGENT_INFOS_FAIL, AGENT_INFOS_REQUEST, AGENT_INFOS_SUCCESS, AGENT_SINGLE_DETAILS_FAIL, AGENT_SINGLE_DETAILS_REQUEST, AGENT_SINGLE_DETAILS_SUCCESS, AGENT_UPDATE_SUCCESS, AGENT_UPDATE_FAIL} from "../constants/constantsAgent";


export const getAgentInfosReducer = (state = { loading: true, agent: [] }, action) => {


    switch (action.type) {
        case AGENT_INFOS_REQUEST:
            return { loading: true }
        case AGENT_INFOS_SUCCESS:
            return { loading: false, agent: action.payload }
        case AGENT_INFOS_FAIL:
            return { loading: false, error: action.payload }

        case AGENT_DELETE_SUCCESS:
            return {...state, loading: false, agent : state.agent.filter (i => i._id !== action.payload) }
        
        case AGENT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case AGENT_UPDATE_SUCCESS :
            return { loading: false, agent : action.payload }

        case AGENT_UPDATE_FAIL :
            return { loading: false, error : action.payload }

        default:
            return state
    }
}

export const createAgentReducer = (state = { loading: true, agent: {} }, action) => {
    switch (action.type) {
        case AGENT_CREATE_REQUEST:
            return { loading: true }
        case AGENT_CREATE_SUCCESS:
            return { loading: false, agent: action.payload }
        case AGENT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getAgentSingleDetailsReducer = (state = { loading: true, agent: [] }, action) => {
    switch (action.type) {
        case AGENT_SINGLE_DETAILS_REQUEST:
            return { loading: true }
        case AGENT_SINGLE_DETAILS_SUCCESS:
            return { loading: false, agent: action.payload }
        case AGENT_SINGLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}