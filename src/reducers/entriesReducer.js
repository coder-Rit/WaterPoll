import {
  CLEAR_ERRORS,
  UPDATE_ENTRIE_LIST_FAIL,
  UPDATE_ENTRIE_LIST_REQUEST,
  UPDATE_ENTRIE_LIST_SUCCESS,
} from "../constants/EntriesConstants";

export const entriesReducer = (state = { entries:[]}, action) => {
  

  switch (action.type) {
    case UPDATE_ENTRIE_LIST_REQUEST:
      return {
        loading: true,
        isEntrieSubmited: false,
        
      };
    case UPDATE_ENTRIE_LIST_SUCCESS:
      return {
        loading: false,
        isEntrieSubmited: true,
        entries:action.payload
      };
    case UPDATE_ENTRIE_LIST_FAIL:
      return {
        loading: false,
        isEntrieSubmited: false,
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
