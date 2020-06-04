import {createSelector} from "reselect";

export const getAllThemesSupport = (state) => state.themesSupport.content;

export const getThemeIdFromProps = (state, props) => props.themeId;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getThemeSupportById = createSelector(getAllThemesSupport, getThemeIdFromProps, (themesSupport, themeId) => {
    if (!themesSupport || themesSupport.length===0) return null;
    return themesSupport.find(t => t.themeId === themeId);
});


