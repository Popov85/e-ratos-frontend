import {instance} from "../../common/_api/axios";

export const optionsAPI = {

    saveOptions(optionsDTO) {
        return instance.post(`/instructor/options`, optionsDTO);
    },

    updateOptions(optionsDTO) {
        return instance.put(`/instructor/options`, optionsDTO);
    },

    deleteOptions(optId) {
        return instance.delete(`/instructor/options/${optId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllOptionsByDepartmentWithDefault() {
        return instance.get(`/department/options/all-options-by-department-with-default`);
    },

}