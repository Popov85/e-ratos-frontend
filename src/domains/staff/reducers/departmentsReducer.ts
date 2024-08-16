import {
    ADD_DEP_IN_STORE,
    CLEAR_ALL_DEP_FAILURES,
    CLEAR_LOADING_ALL_DEP_FAILURE,
    CLEAR_UPDATING_DEP_FAILURE, DELETE_DEP_FROM_STORE,
    DepartmentsActionsTypes,
    LOADING_ALL_DEP,
    LOADING_ALL_DEP_FAILURE,
    SET_ALL_DEP,
    UPDATE_DEP_IN_STORE,
    UPDATE_DEP_NAME_IN_STORE,
    UPDATING_DEP,
    UPDATING_DEP_FAILURE
} from "../actions/departmentsActions";
import {Department} from "../types/Department";

type DepartmentsState = {
    content: Department[];
    isLoading: boolean;
    isUpdating?: boolean;
    error?: Error | null;
    errorUpdate?: Error | null;
}

const initState: DepartmentsState = {
    content: [],
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate: null
};

export const departmentsReducer = (state: DepartmentsState = initState, action: DepartmentsActionsTypes): DepartmentsState => {
    switch (action.type) {
        case LOADING_ALL_DEP: {
            return { ...state, isLoading: action.payload?.isLoading ?? false };
        }
        case LOADING_ALL_DEP_FAILURE: {
            console.warn("Error loading departments!", action.payload);
            return { ...state, error: action.payload?.error ?? null };
        }
        case CLEAR_LOADING_ALL_DEP_FAILURE: {
            return { ...state, error: null };
        }
        case UPDATING_DEP: {
            return { ...state, isUpdating: action.payload?.isUpdating ?? false };
        }
        case UPDATING_DEP_FAILURE: {
            console.warn("Error updating a department!", action.payload?.errorUpdate);
            return { ...state, errorUpdate: action.payload?.errorUpdate ?? null };
        }
        case CLEAR_UPDATING_DEP_FAILURE: {
            return { ...state, errorUpdate: null };
        }
        case CLEAR_ALL_DEP_FAILURES: {
            return { ...state, error: null, errorUpdate: null };
        }
        case SET_ALL_DEP: {
            return { ...state, content: action.payload?.allDep ?? [] };
        }
        case ADD_DEP_IN_STORE: {
            if (action.payload?.dep) {
                return { ...state, content: [...state.content, action.payload.dep] };
            }
            return state;
        }
        case UPDATE_DEP_IN_STORE: {
            const updatedFac: Department | undefined = action.payload?.dep;
            if (updatedFac) {
                return {
                    ...state,
                    content: state.content.map((d: Department): Department => d.depId === updatedFac.depId ? updatedFac : d)
                };
            }
            return state;
        }
        case UPDATE_DEP_NAME_IN_STORE: {
            if (action.payload) {
                const { depId, name } = action.payload;
                return {
                    ...state,
                    content: state.content.map((d: Department) => d.depId === depId ? { ...d, name } : d)
                };
            }
            return state;
        }
        case DELETE_DEP_FROM_STORE: {
            if (action.payload) {
                const {depId} = action.payload;
                return {
                    ...state,
                    content: state.content.filter((d: Department): boolean => d.depId !== depId)
                };
            }
            return state;
        }
        default:
            return state;
    }
};
