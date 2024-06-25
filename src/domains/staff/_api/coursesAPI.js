import {instance} from "../../common/_api/axios";

export const coursesAPI = {

    saveCourse(courseDTO) {
        return instance.post(`/instructor/courses`, courseDTO);
    },

    saveLMSCourse(lmsCourseDTO) {
        return instance.post(`/instructor/lms-courses`, lmsCourseDTO);
    },

    updateCourse(courseDTO) {
        return instance.put(`/instructor/courses`, courseDTO);
    },

    updateLMSCourse(lmsCourseDTO) {
        return instance.put(`/instructor/lms-courses`, lmsCourseDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------

    updateCourseName(courseId, name) {
        return instance.patch(`/instructor/courses/${courseId}/name`, {value: name});
    },

    associateCourseWithLMS(courseId, lmsId) {
        return instance.patch(`/instructor/courses/${courseId}/associate/${lmsId}`);
    },

    disassociateCourseWithLMS(courseId) {
        return instance.patch(`/instructor/lms-courses/${courseId}/disassociate`);
    },

    deleteCourse(courseId) {
        return instance.delete(`/instructor/courses/${courseId}`);
    },


    //---------------------------------------------------For drop down--------------------------------------------------
    fetchAllCoursesByDepartmentForDropDown() {
        return instance.get('/department/courses-dropdown/all-courses-by-department');
    },

    fetchAllCoursesByDepartmentIdForDropDown(depId) {
        return instance.get(`/fac-admin/courses-dropdown/all-courses-by-department?depId=${depId}`);
    },

    //-----------------------------------------------------For table----------------------------------------------------
    fetchAllCoursesByDepartmentForTable() {
        return instance.get('/department/courses-table/all-courses-by-department');
    },

    fetchAllCoursesByDepartmentIdForTable(depId) {
        return instance.get(`/fac-admin/courses-table/all-courses-by-department?depId=${depId}`);
    },
}