import { combineReducers } from "redux";

import restInterfaceReducer from "./restInterfaceReducer";
import paginationReducer from "./paginationReducer";

const rootReducer = () => {
  return {
    bookShelf: restInterfaceReducer,
  }
};

export default rootReducer;
