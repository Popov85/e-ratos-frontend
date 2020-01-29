import {createSelector} from "reselect";
import {ltiVersionTransformer} from "../../utils/transformers/ltiVersionTransformer";

export const getAllProps = (state, props) => props;

export const getLmsIdFromProps = (state, props) => props.lmsId;

export const getAllLTIVersions = state => state.ltiVersions.content;


//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllLTIVersionsForSelect = createSelector(getAllLTIVersions, (ltiVersions) => {
    return ltiVersionTransformer.toSelectWithDummy(ltiVersions);
});

export const getAllLTIVersionsForFilter = createSelector(getAllLTIVersions, (ltiVersions) => {
    if (!ltiVersions) return null;
    return ltiVersionTransformer.toFilter(ltiVersions);
});