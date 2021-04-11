import axios from 'axios'
import {PROJECT_INFOS_REQUEST, PROJECT_INFOS_SUCCESS, PROJECT_INFOS_FAIL, PROJECT_CREATE_REQUEST, PROJECT_CREATE_FAIL, PROJECT_CREATE_SUCCESS, PROJECT_DELETE_REQUEST, PROJECT_DELETE_FAIL, PROJECT_DELETE_SUCCESS, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAIL, PROJECT_SINGLE_DETAILS_REQUEST, PROJECT_SINGLE_DETAILS_SUCCESS, PROJECT_SINGLE_DETAILS_FAIL} from '../constants/constantsProject'

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

export const deleteProject = (id) => async (dispatch) => {
    //dispatch ({type : PROJECT_DELETE_REQUEST})

    try {
        await axios.delete (`/api/projects/${id}`)
        dispatch ({type : PROJECT_DELETE_SUCCESS, payload : id})
    } catch (error) {
        dispatch ({type : PROJECT_DELETE_FAIL, payload : error.message})
    }
}

export const updateProject = (projectId, projectData) => async (dispatch) => {

    try {
        await axios.put (`/api/projects/${projectId}`, projectData)
        const {data} = await axios.get (`/api/projects/`)
        dispatch ({type : PROJECT_UPDATE_SUCCESS, payload : data})
    } catch (error) {
        dispatch ({type : PROJECT_UPDATE_FAIL, payload : error.message})
    }
}

export const getProjectSingleDetails = (projectId) => async (dispatch) => {
    dispatch ({type : PROJECT_SINGLE_DETAILS_REQUEST, payload : projectId})

    try {

        const {data} = await axios.get (`/api/projects/${projectId}`)
        dispatch ({type : PROJECT_SINGLE_DETAILS_SUCCESS, payload : data})

    } catch (error) {
        dispatch ({type : PROJECT_SINGLE_DETAILS_FAIL, payload : error.message})
    }
}

// export const getProjectInfosByStatus = (status) => async (dispatch) => {
//     dispatch ({type : PROJECT_INFOS_BY_STATUS_REQUEST, payload : status})

//     try {
//         const {data} = await axios.get (`/api/projects/${status}`)

//         dispatch ({type : PROJECT_INFOS_BY_STATUS_SUCCESS, payload : data})
//     } catch (error) {
//         dispatch ({type : PROJECT_INFOS_BY_STATUS_FAIL, payload : error.message})
//     }
// }