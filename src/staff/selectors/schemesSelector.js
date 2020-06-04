import {createSelector} from "reselect";
import {schemesTransformer} from "../../utils/transformers/schemesTransformer";
import {dummyArray} from "../../utils/constants";

export const getSchemeIdFromProps = (state, props) => props.schemeId;

export const getAllSchemes = state => state.schemes.content;

export const getAnySchemes = state => {
    const {content, contentMin} = state.schemes;
    if (!content && !contentMin) return null;
    return content ? content : contentMin;
}

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getSchemeById = createSelector(getAllSchemes, getSchemeIdFromProps, (schemes, schemeId) => {
    if (!schemes) return null;
    return schemes.find(c => c.schemeId === schemeId);
});

// For Table filter
export const getAllSchemesForFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemesTransformer.toObject(schemes);
});

// For New form
export const getAllSchemesForSelect = createSelector(getAnySchemes, (schemes) => {
    if (!schemes) return dummyArray;
    return schemesTransformer.toSelectWithDummy(schemes);
});

// For Table filter, extract schemes from schemes array for filter
export const extractCoursesFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.course.courseId)] = scheme.course.name;
        return map;
    }, {});
});

// For Table filter, extract strategies from schemes array for filter
export const extractStrategiesFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.strategy.strId)] = scheme.strategy.name;
        return map;
    }, {});
});

// For Table filter, extract settings from schemes array for filter
export const extractSettingsFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.settings.setId)] = scheme.settings.name;
        return map;
    }, {});
});

// For Table filter, extract modes from schemes array for filter
export const extractModesFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.mode.modeId)] = scheme.mode.name;
        return map;
    }, {});
});

// For Table filter, extract options from schemes array for filter
export const extractOptionsFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.options.optId)] = scheme.options.name;
        return map;
    }, {});
});

// For Table filter, extract options from schemes array for filter
export const extractGradingsFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.grading.gradingId)] = scheme.grading.name;
        return map;
    }, {});
});

// For Table filter, extract accesses from schemes array for filter
export const extractAccessesFromSchemesForTableFilter = createSelector(getAllSchemes, (schemes) => {
    if (!schemes) return null;
    return schemes.reduce((map, scheme) => {
        map[Number(scheme.access.accessId)] = scheme.access.name;
        return map;
    }, {});
});