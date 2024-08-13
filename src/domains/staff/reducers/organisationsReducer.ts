import {
    OrganisationsActionTypes,
    LOADING_ALL_ORG,
    LOADING_ALL_ORG_FAILURE,
    CLEAR_LOADING_ALL_ORG_FAILURE,
    UPDATING_ORG,
    UPDATING_ORG_FAILURE,
    CLEAR_UPDATING_ORG_FAILURE,
    CLEAR_ALL_ORG_FAILURES,
    SET_ALL_ORG,
    ADD_ORG_IN_STORE,
    UPDATE_ORG_IN_STORE,
    UPDATE_ORG_NAME_IN_STORE,
    DELETE_ORG_FROM_STORE,
    SET_ORG_SELECTED,
    CLEAR_ORG_SELECTED
} from "../actions/organisationsActions";
import {Organisation} from "../types/Organisation";

// Define the state interface
type OrganisationsState = {
    content: Array<Organisation>;
    selectedId: number;
    isLoading: boolean;
    isUpdating: boolean;
    error: Error | null;
    errorUpdate: Error | null;
}

// Initial state
const initState: OrganisationsState = {
    content: [],
    selectedId: 0,// Selected value for forms and tables to synchronize lists!
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate:null
};

// Reducer function
export const organisationsReducer = (state: OrganisationsState = initState, action: OrganisationsActionTypes): OrganisationsState => {
    switch (action.type) {
        case LOADING_ALL_ORG: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case LOADING_ALL_ORG_FAILURE: {
            console.warn("Error loading organisations!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case CLEAR_LOADING_ALL_ORG_FAILURE: {
            return {...state, error: null};
        }
        case UPDATING_ORG: {
            return {...state, isUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_ORG_FAILURE: {
            console.warn("Error updating an organisation!", action.payload?.error);
            return {...state, errorUpdate: action.payload?.error ?? null};
        }
        case CLEAR_UPDATING_ORG_FAILURE: {
            return {...state, errorUpdate: null};
        }
        case CLEAR_ALL_ORG_FAILURES: {
            return {...state, error: null, errorUpdate: null};
        }
        case SET_ALL_ORG: {
            return { ...state, content: action.payload ?? [] };
        }
        case ADD_ORG_IN_STORE: {
            return action.payload ? { ...state, content: [...state.content, action.payload] } : state;
        }
        case UPDATE_ORG_IN_STORE: {
            if (action.payload) {
                const org: Organisation = action.payload;
                return {
                    ...state,
                    content: state.content.map((o: Organisation): Organisation => o.orgId === org.orgId ? org : o),
                };
            }
            return state;
        }
        case UPDATE_ORG_NAME_IN_STORE: {
            const payload = action.payload;
            if (payload) {
                const { orgId, name } = payload;
                return {
                    ...state,
                    content: state.content.map((o: Organisation) => o.orgId === orgId ? { ...o, name } : o),
                };
            }
            return state;
        }
        case DELETE_ORG_FROM_STORE: {
            const payload = action.payload;
            if (payload) {
                const { orgId } = payload;
                return {
                    ...state,
                    content: state.content.filter(o => o.orgId !== orgId),
                };
            }
            return state;
        }

        case SET_ORG_SELECTED: {
            const selectedId: number = Number(action.payload?.orgId);
            return {...state, selectedId};
        }
        case CLEAR_ORG_SELECTED: {
            return {...state, selectedId: 0};
        }
        default:
            return state;
    }
};
