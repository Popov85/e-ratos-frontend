import {createSelector} from "reselect";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";
import {dummy, dummyArray} from "../../../utils/constants";

export const getFacIdFromProps = (state, props) => props.facId;

export const getAllFaculties = (state) => state.staff.faculties.content;

//------------------------------------------Re-selectors----------------------------------------------------------------
// For editing (from table)
export const getFacById = createSelector(getAllFaculties, getFacIdFromProps, (faculties, facId) => {
    if (!faculties) return null;
    return faculties.find(f => f.facId === facId);
});

// For Table filter
export const getAllFacForFilter = createSelector(getAllFaculties, (faculties) => {
    if (!faculties) return null;
    return facultiesTransformer.toObject(faculties);
});

// For Select drop-down
export const getAllFacForEdit = createSelector(getAllFaculties, (faculties) => {
    if (!faculties) return null;
    return facultiesTransformer.toSelect(faculties);
});

// For new form with empty default option
export const getAllFacForNew = createSelector(getAllFacForEdit, (faculties) => {
    if (!faculties) return null;
    faculties.unshift(dummy);
    return faculties;
});

// Get map with keys being orgId and values being an array of corresponding faculties
export const getMap = createSelector(getAllFaculties, (faculties) => {
    console.log("Getting map from smart selector!");
    let result = new Map();
    faculties.forEach(f => {
        let orgId = f.organisation.orgId;
        let item = {facId: f.facId, name: f.name};
        if (result.has(orgId)) {
            let array = result.get(orgId);
            array.push(item);
        } else {
            result.set(orgId, [item]);
        }
    });
    return result;
});

// 1) GLOBAl_ADMIN - default is dummy, after selecting - get from map by orgId
// 2) ORG_ADMIN - default is all from store+dummy, never change
// 3) FAC_ADMIN - default is dummy, never change
export const getAllFacForNewByOrgId = state => {
    const {isGlobalAdmin, isAtLeastOrgAdmin}
        = state.auth.authorization;
    if (isGlobalAdmin) {
        const {selectedId} = state.staff.organisations;
        const map = getMap(state);
        const result = map.get(selectedId);
        if (!result) return dummyArray;
        return facultiesTransformer.toSelectWithDummy(result);
    }
    if (isAtLeastOrgAdmin) {
        const result = getAllFaculties(state);
        if (!result) return dummyArray;
        return facultiesTransformer.toSelectWithDummy(result);
    }
    return dummyArray;
}
