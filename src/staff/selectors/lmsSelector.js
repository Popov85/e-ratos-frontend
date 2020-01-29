import {createSelector} from "reselect";
import {lmsTransformer} from "../../utils/transformers/lmsTransformer";

export const getAllProps = (state, props) => props;

export const getLmsIdFromProps = (state, props) => props.lmsId;

export const getAllLMSes = state => state.lms.content;
export const getAllLMSesMin = state => state.lms.contentMin;

export const getAnyLMSes = state => {
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
    return lmsTransformer.toSelectWithDummy(lmses);
});

export const getLMSesForFilter = createSelector(getAnyLMSes, (lmses) => {
    if (!lmses) return null;
    return lmsTransformer.toFilter(lmses);
});