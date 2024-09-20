import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Configure the store with Redux Toolkit
const store = configureStore({
    reducer: rootReducer,  // rootReducer includes all slices (auth, registration, session, etc.)
    devTools: process.env.E_RATOS_PROFILE === "dev",  // Automatically enable Redux DevTools in development
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,  // Disables the serializability check
    }), // Thunk is included by default
});

export default store;