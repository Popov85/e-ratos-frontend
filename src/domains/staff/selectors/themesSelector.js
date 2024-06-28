import {createSelector} from "reselect";
import {themesTransformer} from "../../../utils/transformers/themesTransformer";

export const getAllThemes = (state) => state.staff.themes.content;

export const getThemeIdFromProps = (state, props) => props.themeId;

export const getSelectedThemeIdFromProps = (state, props) => props.match.params.themeId;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getThemeById = createSelector(getAllThemes, getThemeIdFromProps, (themes, themeId) => {
    if (!themes) return null;
    return themes.find(t => t.themeId === themeId);
});

// This method throw Error if a valid result cannot be obtained!
export const getThemeBySelectedId = createSelector(getAllThemes, getSelectedThemeIdFromProps, (themes, themeId) => {
    if (!themes) return null;
    let result = themes.find(t => t.themeId === Number(themeId));
    if (!result) throw new Error('Theme is not found in the local store!');
    return result;
});

// For Table filter
export const getAllThemesForFilter = createSelector(getAllThemes, (themes) => {
    if (!themes) return null;
    return themesTransformer.toObject(themes);
});

// For Table filter, extract courses from themes array for filter
export const extractCoursesFromThemesForTableFilter = createSelector(getAllThemes, (themes) => {
    if (!themes) return null;
    return themes.reduce((map, theme) => {
        map[Number(theme.course.courseId)] = theme.course.name;
        return map;
    }, {});
});

// For Table filter, extract courses from themes array for filter
export const extractAccessesFromThemesForTableFilter = createSelector(getAllThemes, (themes) => {
    if (!themes) return null;
    return themes.reduce((map, theme) => {
        map[Number(theme.access.accessId)] = theme.access.name;
        return map;
    }, {});
});

