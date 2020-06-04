import {createSelector} from "reselect";
import {settingsTransformer} from "../../utils/transformers/settingsTransformer";
import {dummyArray} from "../../utils/constants";

export const getSettingsIdFromProps = (state, props) => props.setId;

export const getAllSettings = state => state.settings.content;

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getSettingsById = createSelector(getAllSettings, getSettingsIdFromProps, (settings, settingsId) => {
    if (!settings) return null;
    return settings.find(s => s.setId === settingsId);
});

// For Table filter
export const getAllSettingsForFilter = createSelector(getAllSettings, (settings) => {
    if (!settings) return null;
    return settingsTransformer.toObject(settings);
});

// For New form
export const getAllSettingsForSelect = createSelector(getAllSettings, (settings) => {
    if (!settings) return dummyArray;
    return settingsTransformer.toSelectWithDummy(settings);
});
