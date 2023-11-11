import {
  CLEAR_ERRORS,
  GET_NETWORK_FAIL,
  GET_NETWORK_REQUEST,
  GET_NETWORK_SUCCESS,
  NETWORK_DELETED_SUCCESS,
  UPDATE_NETWORK_FAIL,
  UPDATE_NETWORK_REQUEST,
  UPDATE_NETWORK_SUCCESS,
} from "../constants/networkConstants";

export const networkReducer = (state = { network: {}}, action) => {
  switch (action.type) {
    case UPDATE_NETWORK_REQUEST:
    case GET_NETWORK_REQUEST:
      return {
        loading: true,
        isNetworkLoaded: false,
      };
    case UPDATE_NETWORK_SUCCESS:
    case GET_NETWORK_SUCCESS:
      return {
        ...state,
        loading: false,
        isNetworkLoaded: true,
        network:action.payload  
      };
    case NETWORK_DELETED_SUCCESS:
      return {
        ...state,
        loading: false,
        isNetworkLoaded: false,
      };
      case UPDATE_NETWORK_FAIL:
      case GET_NETWORK_FAIL:
        return {
        ...state,
        loading: false,
        isNetworkLoaded: false,
        error:action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
