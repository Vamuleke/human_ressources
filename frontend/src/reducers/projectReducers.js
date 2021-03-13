import {PROJECT_INFOS_REQUEST, PROJECT_INFOS_SUCCESS, PROJECT_INFOS_FAIL, PROJECT_CREATE_REQUEST, PROJECT_CREATE_FAIL, PROJECT_CREATE_SUCCESS} from '../constants/constantsProject'

export const getProjectInfosReducer = (state = {project : [], loading : true}, action) => {
    switch (action.type) {
        case PROJECT_INFOS_REQUEST :
            return {loading : true}
        case PROJECT_INFOS_SUCCESS :
            return {loading : false, project : action.payload}
        case PROJECT_INFOS_FAIL :
            return {loading : false, error : action.payload}
        default :
            return state
    }
}

export const createProjectReducer = (state = {project : [], loading : true}, action) => {
    switch (action.type) {
        case PROJECT_CREATE_REQUEST :
            return {loading : true}
        case PROJECT_CREATE_SUCCESS :
            return {loading : false, project : action.payload}
        case PROJECT_CREATE_FAIL :
            return {loading : false, error : action.payload}
        default :
            return false
    }
}