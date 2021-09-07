import { combineReducers } from "redux";
import reducers from "./index.js";

const rootReducers = combineReducers({
  pink: reducers,
});

export default rootReducers;
