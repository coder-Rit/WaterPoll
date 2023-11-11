import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";

import thunk from "redux-thunk";

import { networkReducer } from "./reducers/networkReducer";

import {composeWithDevTools} from 'redux-devtools-extension';
import { alertReducer } from "./reducers/alertReducer";

const combinedReducer = combineReducers({
  network: networkReducer,
  alert:alertReducer,
});
let initalState = {};

const middleWare = [thunk]; 

const Store = createStore( 
  combinedReducer,
  initalState, 
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default Store;
