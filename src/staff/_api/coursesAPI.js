import {instance} from "../../common/_api/axios";

export const coursesAPI = {

    fetchAllCoursesByDepartmentForDropDown() {
        return instance.get('/department/courses-dropdown/all-courses-by-department');
    },

    fetchAllCoursesByDepartmentIdForDropDown(depId) {
        return instance.get(`/fac-admin/courses-dropdown/all-courses-by-department?depId=${depId}`);
    },
}