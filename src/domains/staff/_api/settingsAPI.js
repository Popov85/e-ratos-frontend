import {instance} from "../../common/_api/axios";

export const settingsAPI = {

    saveSettings(settingsDTO) {
        return instance.post(`/instructor/settings`, settingsDTO);
    },

    updateSettings(settingsDTO) {
        return instance.put(`/instructor/settings`, settingsDTO);
    },

    deleteSettings(setId) {
        return instance.delete(`/instructor/settings/${setId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllSettingsByDepartmentWithDefault() {
        return instance.get(`/department/settings/all-settings-by-department-with-default`);
    },

}