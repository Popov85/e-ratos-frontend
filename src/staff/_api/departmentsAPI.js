import {instance} from "../../common/_api/axios";

export const departmentsAPI = {

    fetchAllDepartmentsByFacultyForDropDown() {
        return instance.get(`/fac-admin/departments-dropdown/all-by-faculty`);
    },

    fetchAllDepartmentsByFacultyIdForDropDown(facId) {
        return instance.get(`/org-admin/departments-dropdown/all-by-faculty?facId=${facId}`);
    },
}