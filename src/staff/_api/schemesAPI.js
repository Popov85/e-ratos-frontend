import {instance} from "../../common/_api/axios";

export const schemesAPI = {

    saveScheme(schemeDTO) {
        return instance.post(`/instructor/schemes`, schemeDTO);
    },

    updateScheme(schemeDTO) {
        return instance.put(`/instructor/schemes`, schemeDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    updateSchemeName(schemeId, name) {
        return instance.patch(`/instructor/schemes/${schemeId}/name`, {value: name});
    },

    updateSchemeActive(schemeId, isActive) {
        return instance.patch(`/instructor/schemes/${schemeId}/is-active?isActive=${isActive}`);
    },

    updateSchemeLMSOnly(schemeId, isLmsOnly) {
        return instance.patch(`/instructor/schemes/${schemeId}/is-lms-only?isLmsOnly=${isLmsOnly}`);
    },

    deleteScheme(schemeId) {
        return instance.delete(`/instructor/schemes/${schemeId}`);
    },

    //-----------------------------------------------For edit-----------------------------------------------------------

    fetchOneSchemeByIdForEdit(schemeId) {
        return instance.get(`/instructor/schemes/${schemeId}`);
    },

    //-----------------------------------------------For table----------------------------------------------------------

    fetchAllSchemesByDepartmentForTable() {
        return instance.get('/department/schemes/all-schemes-by-department');
    },

    //------------------------------------------Filters in results------------------------------------------------------

    fetchAllSchemesForFilterByDepartment() {
        return instance.get('/department/schemes-dropdown/all-schemes-by-department');
    },

    fetchAllSchemesForFilterByDepartmentId(depId) {
        return instance.get(`/fac-admin/schemes-dropdown/all-schemes-by-department?depId=${depId}`);
    },

    fetchAllSchemesForFilterByCourseId(courseId) {
        return instance.get(`/department/schemes-dropdown/all-schemes-by-course?courseId=${courseId}`);
    }
}