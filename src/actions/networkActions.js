import { MAKE_ALERT } from "../constants/alertConstants";
import {
  GET_NETWORK_FAIL,
  GET_NETWORK_REQUEST,
  GET_NETWORK_SUCCESS,
  NETWORK_DELETED_SUCCESS,
  UPDATE_NETWORK_FAIL,
  UPDATE_NETWORK_REQUEST,
  UPDATE_NETWORK_SUCCESS,
} from "../constants/networkConstants";

import axios from "axios";

export const getNetwork = () => async (dispatch) => {
  try {
    dispatch({ type: GET_NETWORK_REQUEST });
    const { data } = await axios.get("/api/v1/getNetwork");
    dispatch({ type: GET_NETWORK_SUCCESS, payload: data.network[0] });
    dispatch({ type: MAKE_ALERT, payload1: 1, payload2: "Network loaded" });
  } catch (error) {
    dispatch({ type: GET_NETWORK_FAIL, payload: error.response.data.msg });
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: error.response.data.message,
    });
  }
};




export const updateNetwork = (newNetwork) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NETWORK_REQUEST });
    console.log(newNetwork);

    const { data } = await axios.post(
      "/api/v1/updateNetwork",
      {newNetwork}
    );

     dispatch({ type: UPDATE_NETWORK_SUCCESS, payload: data.network });
     dispatch({ type: MAKE_ALERT, payload1: 1, payload2: "Network updated successfuly" });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_NETWORK_FAIL, payload: error.response.data.msg });
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: error.response.data.msg,
    });
  }
};


export const deleteNetwork = (id) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_NETWORK_REQUEST });

    await axios.delete(
      `/api/v1/deleteNetwork/${id}`,
  
    );
    
     dispatch({ type: NETWORK_DELETED_SUCCESS });
     dispatch({ type: MAKE_ALERT, payload1: 1, payload2: "Network deleted" });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_NETWORK_FAIL, payload: error.response.data.msg });
    dispatch({
      type: MAKE_ALERT,
      payload1: 0,
      payload2: error.response.data.msg,
    });
  }
};
 