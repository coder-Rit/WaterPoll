import { MAKE_ALERT } from "../constants/alertConstants";
import {
   UPDATE_ENTRIE_LIST_FAIL, UPDATE_ENTRIE_LIST_REQUEST, UPDATE_ENTRIE_LIST_SUCCESS,
} from "../constants/EntriesConstants";

import axios from "axios";

 


export const updateEntries = (entries,oldEntries) => async (dispatch) => {


  console.log(entries,oldEntries);
  try {
    dispatch({ type: UPDATE_ENTRIE_LIST_REQUEST });

    const {data} = await axios.post("/api/v1/addEntrie",{
      ...entries
    })

    dispatch({ type: UPDATE_ENTRIE_LIST_SUCCESS, payload: [entries,...oldEntries] });
    dispatch({
      type: MAKE_ALERT,
      payload1: 1,
      payload2: data.msg,
    });
    
  } catch (error) {
    console.log(error );
    dispatch({ type: UPDATE_ENTRIE_LIST_FAIL, payload: error });
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: "",
    });
  }



};

export const getEntries = () => async (dispatch) => {


  try {
    dispatch({ type: UPDATE_ENTRIE_LIST_REQUEST });

    const {data} = await axios.get("/api/v1/getEntreis")
    console.log(data);

    dispatch({ type: UPDATE_ENTRIE_LIST_SUCCESS, payload: data.data });
   
    
  } catch (error) {
    console.log(error );
    
    dispatch({ type: UPDATE_ENTRIE_LIST_FAIL, payload: error });
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: error,
    });
  }



};


export const deleteNetwork = (id) => async (dispatch) => {

  
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: "",
    });
};
  