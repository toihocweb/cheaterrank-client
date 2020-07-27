import { combineReducers } from "redux";
import testReducer from "./testReducer";
import resultReducer from "./resultReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  testReducer,
  resultReducer,
  errorReducer,
});

export default rootReducer;
