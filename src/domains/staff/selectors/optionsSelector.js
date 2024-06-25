import {createSelector} from "reselect";
import {optionsTransformer} from "../../../utils/transformers/optionsTransformer";
import {dummyArray} from "../../../utils/constants";

export const getOptionsIdFromProps = (state, props) => props.optId;

export const getAllOptions = state => state.staff.options.content;

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getOptionsById = createSelector(getAllOptions, getOptionsIdFromProps, (options, optionsId) => {
    if (!options) return null;
    return options.find(o => o.optId === optionsId);
});

// For Table filter
export const getAllOptionsForFilter = createSelector(getAllOptions, (options) => {
    if (!options) return null;
    return optionsTransformer.toObject(options);
});

// For New form
export const getAllOptionsForSelect = createSelector(getAllOptions, (options) => {
    if (!options) return dummyArray;
    return optionsTransformer.toSelectWithDummy(options);
});
