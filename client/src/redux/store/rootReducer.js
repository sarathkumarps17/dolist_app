import { combineReducers } from "redux";
import alertReducer from "../reducers/alertReducer";
import authReducer from "../reducers/authReducer";
import doListReducer from "../reducers/doListReducer";
import collectionReducer from "../reducers/collectionReducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  doList: doListReducer,
  collection: collectionReducer,
});
