import {createSelector} from "reselect";
import {themesTransformer} from "../../utils/transformers/themesTransformer";

export const getThemeIdFromProps = (state, props) => props.themeId;

export const getAllThemes = (state) => state.themes.content;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getThemeById = createSelector(getAllThemes, getThemeIdFromProps, (themes, themeId) => {
    if (!themes) return null;
    return themes.find(t => t.themeId === themeId);
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

