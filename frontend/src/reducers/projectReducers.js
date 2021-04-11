import {
  PROJECT_INFOS_REQUEST,
  PROJECT_INFOS_SUCCESS,
  PROJECT_INFOS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_SINGLE_DETAILS_REQUEST,
  PROJECT_SINGLE_DETAILS_SUCCESS,
  PROJECT_SINGLE_DETAILS_FAIL,
} from "../constants/constantsProject";

export const getProjectInfosReducer = (
  state = { project: [], loading: true },
  action
) => {
  switch (action.type) {
    case PROJECT_INFOS_REQUEST:
      return { loading: true };
    case PROJECT_INFOS_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_INFOS_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        project: state.project.filter((p) => p._id !== action.payload),
      };

    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, project: action.payload };

    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProjectReducer = (
  state = { project: [], loading: true },
  action
) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true };
    case PROJECT_CREATE_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return false;
  }
};

export const getProjectSingleDetailsReducer = (state = { loading: true, project: [] }, action) => {
  switch (action.type) {
      case PROJECT_SINGLE_DETAILS_REQUEST:
          return { loading: true }
      case PROJECT_SINGLE_DETAILS_SUCCESS:
          return { loading: false, project: action.payload }
      case PROJECT_SINGLE_DETAILS_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}