import { combineReducers,createStore } from "redux";
import { qlSVReducer } from "./RootReduce/QLSVReducer";

const rootReducer = combineReducers({
  qlSVReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())