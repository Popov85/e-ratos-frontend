import {instance} from "../../common/_api/axios";

export const themesAPI = {

    saveTheme(themeDTO) {
        return instance.post(`/instructor/themes`, themeDTO);
    },

    updateTheme(themeDTO) {
        return instance.put(`/instructor/themes`, themeDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    updateThemeName(themeId, name) {
        return instance.patch(`/instructor/themes/${themeId}/name`, {value: name});
    },

    deleteTheme(themeId) {
        return instance.delete(`/instructor/themes/${themeId}`);
    },

    //---------------------------------------------------For drop down--------------------------------------------------
    fetchAllThemesByDepartmentForDropDown() {
        return instance.get('/department/themes-dropdown/all-themes-by-department');
    },

    fetchAllThemesByDepartmentIdForDropDown(depId) {
        return instance.get(`/fac-admin/themes-dropdown/all-themes-by-department?depId=${depId}`);
    },

    //-----------------------------------------------------For table----------------------------------------------------
    fetchThemeById(themeId) {
        return instance.get(`/department/themes-table/theme?id=${themeId}`);
    },

    fetchAllThemesByDepartmentForTable() {
        return instance.get('/department/themes-table/all-themes-by-department');
    },

    fetchAllThemesByDepartmentIdForTable(depId) {
        return instance.get(`/fac-admin/themes-table/all-themes-by-department?depId=${depId}`);
    }
}