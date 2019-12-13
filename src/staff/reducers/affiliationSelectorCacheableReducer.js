import {facultiesTransformer} from "../../utils/transformers/facultiesTransformer";
import {departmentsTransformer} from "../../utils/transformers/departmentsTransformer";
import {organisationsTransformer} from "../../utils/transformers/organisationsTransformer";
import {Selected} from "../objects/Selected";

const dummyValue = {
    value: "",
    label: "Select"
}

const organisationsInit = [dummyValue];

const facultiesInit = [dummyValue];

const departmentsInit = [dummyValue];

const organisationsTestInit = [dummyValue, {value: 1, label: "Org #1"}];

const facultiesTestInit = [dummyValue, {value: 1, label: "Fac #1"}];

const departmentsTestInit = [dummyValue, {value: 1, label: "Dep #1"}];

const testSelected = {
    org: {
        value: 1,
        label : "Organisation #1"
    },
    fac: {
        value: 1,
        label: "Faculty #1"
    },
    dep: {
        value: 1,
        label: "Department #1"
    }
}
const testInitState = {
    organisations: organisationsTestInit,
    organisationsMap: new Map(),
    faculties: facultiesTestInit,
    facultiesMap: new Map(),
    departments: departmentsTestInit,
    departmentsMap: new Map(),
    selected: testSelected,
    isLoading: false,
    error: new Error('Failure')
}

const initState = {
    organisations: organisationsInit,
    organisationsMap: new Map(),
    faculties: facultiesInit,
    facultiesMap: new Map(),
    departments: departmentsInit,
    departmentsMap: new Map(),
    selected: null
}

export const affiliationSelectorCacheableReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE": {
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE": {
            return {...state, error: null};
        }
        case "SET_ORGANISATIONS_FOR_SELECTOR_CACHEABLE": {
            let organisations = organisationsTransformer.toSelect(action.payload);
            organisations.unshift(dummyValue);
            let organisationsMap = state.organisationsMap;
            organisationsMap.set(action.key, organisations);
            return {...state, organisations, organisationsMap};
        }
        case "SET_FACULTIES_FOR_SELECTOR_CACHEABLE": {
            let faculties = facultiesTransformer.toSelect(action.payload);
            faculties.unshift(dummyValue);
            let facultiesMap = state.facultiesMap;
            facultiesMap.set(action.key, faculties);
            return {...state, faculties, facultiesMap};
        }
        case "SET_DEPARTMENTS_FOR_SELECTOR_CACHEABLE": {
            let departments = departmentsTransformer.toSelect(action.payload);
            departments.unshift(dummyValue);
            let departmentsMap = state.departmentsMap;
            departmentsMap.set(action.key, departments);
            return {...state, departments, departmentsMap};
        }
        case "SET_EXISTING_ORGANISATIONS_FOR_SELECTOR_CACHEABLE": {
            let key = action.key;
            let organisations = state.organisationsMap.get(key);
            return {...state, organisations};
        }
        case "SET_EXISTING_FACULTIES_FOR_SELECTOR_CACHEABLE": {
            let key = action.key;
            let faculties = state.facultiesMap.get(key);
            return {...state, faculties};
        }
        case "SET_EXISTING_DEPARTMENTS_FOR_SELECTOR_CACHEABLE": {
            let key = action.key;
            let departments = state.departmentsMap.get(key);
            return {...state, departments};
        }
        case "SET_SELECTED_CACHEABLE": {
            let affiliation = action.payload;
            const {orgId, facId, depId} = affiliation; // strings
            let org, fac, dep;
            if (orgId) org = state.organisations.find(o=>o.value===Number(orgId));
            if (facId) fac = state.faculties.find(f=>f.value===Number(facId));
            if (depId) dep = state.departments.find(d=>d.value===Number(depId));
            let selected = new Selected(org, fac, dep);
            return {...state, selected};
        }
        case "CLEAR_SELECTED_CACHEABLE": {
            return {...state, selected: null};
        }
        case "CLEAR_ALL_ON_ORGANISATION_RESET_CACHEABLE": {
            return {...state, faculties: facultiesInit, departments: departmentsInit};
        }
        case "CLEAR_ALL_ON_FACULTY_RESET_CACHEABLE": {
            return {...state, departments: departmentsInit};
        }
        default:
            return state;
    }
}