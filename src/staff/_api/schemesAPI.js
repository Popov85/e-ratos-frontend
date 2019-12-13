import {instance} from "../../common/_api/axios";

export const schemesAPI = {

    fetchAllSchemesForFilterByDepartment() {
        return instance.get('/department/schemes-dropdown/all-schemes-by-department');
    },

    fetchAllSchemesForFilterByDepartmentId(depId) {
        return instance.get(`/fac-admin/schemes-dropdown/all-schemes-by-department?depId=${depId}`);
    },

    fetchAllSchemesForFilterByCourseId(courseId) {
        return instance.get(`/department/schemes-dropdown/all-schemes-by-course?courseId=${courseId}`);
    },
}