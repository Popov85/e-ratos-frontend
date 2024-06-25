import {createSelector} from "reselect";

export const getAllResources = (state) => state.staff.resources.content;

export const getResourceIdFromProps = (state, props) => props.resourceId;

export const getSelectedResourceIdFromProps = (state, props) => props.match.params.resourceId;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getResourceById = createSelector(getAllResources, getResourceIdFromProps, (resources, resourceId) => {
    if (!resources) return null;
    return resources.find(r => r.resourceId === resourceId);
});

// This method throw Error if a valid result cannot be obtained!
export const getResourceBySelectedId = createSelector(getAllResources, getResourceIdFromProps, (resources, resourceId) => {
    if (!resources) throw new Error('No resources are present in the local store!');
    let result = resources.find(r => r.resourceId === Number(resourceId));
    if (!result) throw new Error('Resource is not found in the local store!');
    return result;
});

