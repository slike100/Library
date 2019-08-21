import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import restInterfaceReducer from "./reducers/restInterfaceReducer";
// import our root combined reducer
// import rootReducer from "./reducers/index";

// define an immediately invoked function which will create our store
export default (function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  // return our store, passing in our root reducer, our initial state, our middleware
  return createStore(
    restInterfaceReducer,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
})();
