import {instance} from "../../common/_api/axios";

export const departmentsAPI = {

    saveDep(depDTO) {
        return instance.post(`/fac-admin/departments`, depDTO);
    },

    updateDep(depDTO) {
        return instance.put(`/fac-admin/departments`, depDTO);
    },

    updateDepName(depId, name) {
        return instance.patch(`/fac-admin/departments/${depId}/name?name=${name}`);
    },

    deleteDep(depId) {
        return instance.delete(`/fac-admin/departments/${depId}`);
    },

    //------------------------------------------------For drop-down-----------------------------------------------------

    fetchAllDepartmentsByFacultyForDropDown() {
        return instance.get(`/fac-admin/departments-dropdown/all-dep-by-faculty`);
    },

    fetchAllDepartmentsByFacultyIdForDropDown(facId) {
        return instance.get(`/org-admin/departments-dropdown/all-dep-by-faculty?facId=${facId}`);
    },

    //-----------------------------------------------For table----------------------------------------------------------

    fetchAllDepartmentsByFacultyForTable() {
        return instance.get(`/fac-admin/departments-table/all-dep-by-faculty`);
    },

    fetchAllDepartmentsByOrganisationForTable() {
        return instance.get(`/org-admin/departments-table/all-dep-by-organisation`);
    },

    fetchAllDepartmentsByRatosForTable() {
        return instance.get(`/global-admin/departments-table/all-dep-by-ratos`);
    },

}