import {createSelector} from "reselect";
import {strategyTransformer as strategiesTransformer, strategyTransformer} from "../../../utils/transformers/strategyTransformer";

const dummy = {value: "", label: "Select"};

export const getAllStrategiesMin = (state) => state.staff.strategy ? state.staff.strategy.contentMin : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllStrategiesForSelect = createSelector(getAllStrategiesMin, (strategies) => {
    if (!strategies) return [dummy];
    return strategyTransformer.toSelect(strategies);
});

export const getAllStrategiesForFilter = createSelector(getAllStrategiesMin, (strategies) => {
    if (!strategies) return null;
    return strategiesTransformer.toObject(strategies);
});