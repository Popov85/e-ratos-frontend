import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";

// Define the type for the composeEnhancers function
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Use the Redux DevTools extension if available, otherwise fall back to the default compose function
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with the rootReducer, middleware, and enhancers
const store: Store<RootState> = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState>))
);

export default store;