import { AGENT_INFOS_FAIL, AGENT_INFOS_SUCCESS, AGENT_INFOS_REQUEST, AGENT_CREATE_REQUEST, AGENT_CREATE_FAIL, AGENT_CREATE_SUCCESS, AGENT_SINGLE_DETAILS_REQUEST, AGENT_SINGLE_DETAILS_FAIL, AGENT_SINGLE_DETAILS_SUCCESS, AGENT_DELETE_FAIL, AGENT_DELETE_SUCCESS, AGENT_UPDATE_SUCCESS, AGENT_UPDATE_FAIL } from '../constants/constantsAgent'
import axios from 'axios'

export const getAgentInfos = () => async (dispatch) => {
    dispatch({ type: AGENT_INFOS_REQUEST })

    try {
        const { data } = await axios.get('/api/agents')
        dispatch({ type: AGENT_INFOS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: AGENT_INFOS_FAIL, payload: error.message })
    }
}

export const createAgent = (agentData) => async (dispatch) => {
    
    dispatch({
        type: AGENT_CREATE_REQUEST,
        payload: agentData
    })

    try {
        const { data } = await axios.post('/api/agents/', agentData)

        dispatch({ type: AGENT_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: AGENT_CREATE_FAIL, payload: error.message })
    }
}

export const getAgentSingleDetails = (agentId) => async (dispatch) => {
    dispatch ({type : AGENT_SINGLE_DETAILS_REQUEST, payload : agentId})

    try {

        const {data} = await axios.get (`/api/agents/${agentId}`)
        dispatch ({type : AGENT_SINGLE_DETAILS_SUCCESS, payload : data})

    } catch (error) {
        dispatch ({type : AGENT_SINGLE_DETAILS_FAIL, payload : error.message})
    }
}

export const deleteAgent = (agentId) => async (dispatch) => {

    try {
        await axios.delete (`/api/agents/${agentId}`)
        //const {data} = await axios.get (`/api/agents/`)
        dispatch ({type : AGENT_DELETE_SUCCESS, payload : agentId})
    } catch (error) {
        dispatch ({type : AGENT_DELETE_FAIL, payload : error.message})
    }
   
}

export const updateAgent = (agentId, agentData) => async (dispatch) => {

    try {
        await axios.put (`/api/agents/${agentId}`, agentData)
        const {data} = await axios.get (`/api/agents/`)
        dispatch ({type : AGENT_UPDATE_SUCCESS, payload : data})
    } catch (error) {
        dispatch ({type : AGENT_UPDATE_FAIL, payload : error.message})
    }
}