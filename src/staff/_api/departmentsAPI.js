import {instance} from "../../common/_api/axios";

export const departmentsAPI = {

    fetchAllDepartmentsByFacultyForDropDown() {
        return instance.get(`/fac-admin/departments-dropdown/all-dep-by-faculty`);
    },

    fetchAllDepartmentsByFacultyIdForDropDown(facId) {
        return instance.get(`/org-admin/departments-dropdown/all-dep-by-faculty?facId=${facId}`);
    },
}