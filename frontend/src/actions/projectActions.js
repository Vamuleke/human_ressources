import axios from 'axios'
import {PROJECT_INFOS_REQUEST, PROJECT_INFOS_SUCCESS, PROJECT_INFOS_FAIL, PROJECT_CREATE_REQUEST, PROJECT_CREATE_FAIL, PROJECT_CREATE_SUCCESS} from '../constants/constantsProject'

export const getProjectInfos = () => async (dispatch) => {
    dispatch ({type : PROJECT_INFOS_REQUEST})

    try {
        const {data} = await axios.get ('/api/projects')
        dispatch ({type : PROJECT_INFOS_SUCCESS, payload : data})
    } catch (error) {
        dispatch ({type : PROJECT_INFOS_FAIL, payload : error.message})
    }
}

export const createProject = (project) => async (dispatch) => {
    dispatch ({type : PROJECT_CREATE_REQUEST})

    try {
        const {data} = await axios.post ('/api/projects', project)
        dispatch ({type : PROJECT_CREATE_SUCCESS, payload : data})
    } catch (error) {
        dispatch ({type : PROJECT_CREATE_FAIL, payload : error.message})
    }
}