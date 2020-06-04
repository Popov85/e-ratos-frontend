import {createSelector} from "reselect";
import {dummyArray} from "../../utils/constants";
import {modesTransformer} from "../../utils/transformers/modesTransformer";

export const getModeIdFromProps = (state, props) => props.modeId;

export const getAllModes = state => state.modes.content;

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getModeById = createSelector(getAllModes, getModeIdFromProps, (mode, modeId) => {
    if (!mode) return null;
    return mode.find(m => m.modeId === modeId);
});

// For Table filter
export const getAllModesForFilter = createSelector(getAllModes, (modes) => {
    if (!modes) return null;
    return modesTransformer.toObject(modes);
});

// For New form
export const getAllModesForSelect = createSelector(getAllModes, (modes) => {
    if (!modes) return dummyArray;
    return modesTransformer.toSelectWithDummy(modes);
});
