import authReducer from "./authReducer";
import adminReducer from "./adminReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer,
  adminReducer,
});

export default rootReducer;
