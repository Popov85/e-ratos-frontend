import {createSelector} from "reselect";

const dummy = {value: "", label: "Select"};

export const getAllProps = (state, props) => props;

export const getLmsIdFromProps = (state, props) => props.editableLmsId;

export const getAllLMSes = (state) => state.lms.content;
export const getAllLMSesMin = (state) => state.lms.contentMin;

export const getAnyLMSes = (state) => {
    const {content, contentMin} = state.lms;
    if (!content && !contentMin) return null;
    return content ? content : contentMin;
}

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getLMSById = createSelector(getAllLMSes, getLmsIdFromProps, (lmses, lmsId) => {
    if (!lmses) return null;
    return lmses.find(lms => lms.lmsId === lmsId);
});

export const getLMSesForSelect = createSelector(getAnyLMSes, (lmses) => {
    if (!lmses) return [dummy];
    let result = lmses.map(lms => {
        let item = {};
        item.value = lms.lmsId;
        item.label = lms.name;
        return item;
    });
    result.unshift(dummy);
    return result;
});

export const getLMSesForFilter = createSelector(getAnyLMSes, (lmses) => {
    return lmses.reduce((map, lms) => {
        map[lms.lmsId] = lms.name;
        return map;
    }, {});
});