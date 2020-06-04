import {facultiesTransformer} from "../../utils/transformers/facultiesTransformer";
import {departmentsTransformer} from "../../utils/transformers/departmentsTransformer";
import {organisationsTransformer} from "../../utils/transformers/organisationsTransformer";
import {Selected} from "../objects/Selected";
import {dev} from "../../profile";

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
    faculties: facultiesTestInit,
    departments: departmentsTestInit,
    selected: testSelected,
    isLoading: false,
    error: new Error('Failure')
}

const initState = {
    organisations: organisationsInit,
    faculties: facultiesInit,
    departments: departmentsInit,
    selected: null
}

export const affiliationSelectorReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE": {
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE": {
            return {...state, error: null};
        }
        case "SET_ORGANISATIONS_FOR_SELECTOR": {
            let organisations = organisationsTransformer.toSelect(action.payload);
            organisations.unshift(dummyValue);
            return {...state, organisations};
        }
        case "SET_FACULTIES_FOR_SELECTOR": {
            let faculties = facultiesTransformer.toSelect(action.payload);
            faculties.unshift(dummyValue);
            return {...state, faculties};
        }
        case "SET_DEPARTMENTS_FOR_SELECTOR": {
            let departments = departmentsTransformer.toSelect(action.payload);
            departments.unshift(dummyValue);
            return {...state, departments};
        }

        case "SET_SELECTED": {
            let affiliation = action.payload;
            const {orgId, facId, depId} = affiliation; // strings
            let org, fac, dep;
            if (orgId) org = state.organisations.find(o=>o.value===Number(orgId));
            if (facId) fac = state.faculties.find(f=>f.value===Number(facId));
            if (depId) dep = state.departments.find(d=>d.value===Number(depId));
            let selected = new Selected(org, fac, dep);
            return {...state, selected};
        }
        case "CLEAR_SELECTED": {
            return {...state, selected: null};
        }
        case "CLEAR_ALL_ON_ORGANISATION_RESET": {
            return {...state, faculties: facultiesInit, departments: departmentsInit};
        }
        case "CLEAR_ALL_ON_FACULTY_RESET": {
            return {...state, departments: departmentsInit};
        }
        default:
            return state;
    }
}