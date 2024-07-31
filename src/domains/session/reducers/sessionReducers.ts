import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import { failureReducer } from "./failureReducer";
import { schemeInfoReducer } from "./schemeInfoReducer";

// Define the RootState type
export type RootSessionState = {
    schemeInfo: ReturnType<typeof schemeInfoReducer>;
    session: ReturnType<typeof sessionReducer>;
    failure: ReturnType<typeof failureReducer>;
}

// Combine the reducers with TypeScript
const sessionReducers = combineReducers<RootSessionState>({
    schemeInfo: schemeInfoReducer,
    session: sessionReducer,
    failure: failureReducer,
});

export default sessionReducers;
