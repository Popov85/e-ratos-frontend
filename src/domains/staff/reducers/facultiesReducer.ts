import {Faculty} from "../types/Faculty";
import {
    ADD_FAC_IN_STORE,
    CLEAR_ALL_FAC_FAILURES,
    CLEAR_LOADING_ALL_FAC_FAILURE,
    CLEAR_UPDATING_FAC_FAILURE,
    DELETE_FAC_FROM_STORE,
    FacultiesActionTypes,
    LOADING_ALL_FAC,
    LOADING_ALL_FAC_FAILURE,
    SET_ALL_FAC,
    UPDATE_FAC_IN_STORE,
    UPDATE_FAC_NAME_IN_STORE,
    UPDATING_FAC,
    UPDATING_FAC_FAILURE
} from "../actions/facultiesActions"; // Adjust the import path

type FacultiesState = {
    content: Faculty[];
    isLoading: boolean;
    isUpdating: boolean;
    error: Error | null;
    errorUpdate?: Error | null;
}

const initState: FacultiesState = {
    content: [],
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate: null
};

export const facultiesReducer = (state: FacultiesState = initState, action: FacultiesActionTypes): FacultiesState => {
    switch (action.type) {
        case LOADING_ALL_FAC: {
            return { ...state, isLoading: action.payload?.isLoading ?? false };
        }
        case LOADING_ALL_FAC_FAILURE: {
            console.warn("Error loading faculties!", action.payload?.error);
            return { ...state, error: action.payload?.error ?? null };
        }
        case CLEAR_LOADING_ALL_FAC_FAILURE: {
            return { ...state, error: null };
        }
        case UPDATING_FAC: {
            return { ...state, isUpdating: action.payload?.isUpdating ?? false };
        }
        case UPDATING_FAC_FAILURE: {
            console.warn("Error updating a faculty!", action.payload?.error);
            return { ...state, errorUpdate: action.payload?.error ?? null };
        }
        case CLEAR_UPDATING_FAC_FAILURE: {
            return { ...state, errorUpdate: null };
        }
        case CLEAR_ALL_FAC_FAILURES: {
            return { ...state, error: null, errorUpdate: null };
        }
        case SET_ALL_FAC: {
            return { ...state, content: action.payload?.allFac ?? [] };
        }
        case ADD_FAC_IN_STORE: {
            return action.payload?.fac
                ? { ...state, content: [...state.content, action.payload.fac] }
                : state;
        }
        case UPDATE_FAC_IN_STORE: {
            if (!action.payload || !action.payload.fac) return state;
            const fac: Faculty = action.payload.fac;
            return {
                ...state,
                content: state.content.map((f: Faculty): Faculty => f.facId === fac.facId ? fac : f)
            };
        }
        case UPDATE_FAC_NAME_IN_STORE: {
            if (!action.payload || !action.payload.facId || !action.payload.name) return state;
            const { facId, name } = action.payload;
            return {
                ...state,
                content: state.content.map((f: Faculty) => f.facId === facId ? { ...f, name } : f)
            };
        }
        case DELETE_FAC_FROM_STORE: {
            if (!action.payload || !action.payload.facId) return state;
            const { facId } = action.payload;
            return {
                ...state,
                content: state.content.filter((f: Faculty): boolean => f.facId !== facId)
            };
        }
        default:
            return state;
    }
};
