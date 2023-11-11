import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";

import thunk from "redux-thunk";

import { entriesReducer } from "./reducers/entriesReducer";

import {composeWithDevTools} from 'redux-devtools-extension';
import { alertReducer } from "./reducers/alertReducer";

const combinedReducer = combineReducers({
  entries: entriesReducer,
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
