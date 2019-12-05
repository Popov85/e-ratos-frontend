import {instance} from "../../common/_api/axios";

export const schemesAPI = {

    fetchAllSchemesForFilterByDepartment() {
        return instance.get('/department/schemes-dropdown/all-by-department');
    },

    fetchAllSchemesForFilterByDepartmentId(depId) {
        return instance.get(`/fac-admin/schemes-dropdown/all-by-department?depId=${depId}`);
    },

    fetchAllSchemesForFilterByCourseId(courseId) {
        return instance.get(`/department/schemes-dropdown/all-by-course?courseId=${courseId}`);
    },
}