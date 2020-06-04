import {instance} from "../../common/_api/axios";

export const modesAPI = {

    saveMode(modeDTO) {
        return instance.post(`/instructor/modes`, modeDTO);
    },

    updateMode(modeDTO) {
        return instance.put(`/instructor/modes`, modeDTO);
    },

    deleteMode(modeId) {
        return instance.delete(`/instructor/modes/${modeId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllModesByDepartmentWithDefault() {
        return instance.get(`/department/modes/all-modes-by-department-with-default`);
    },

}