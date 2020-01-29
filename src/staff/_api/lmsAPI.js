import {instance} from "../../common/_api/axios";

export const lmsAPI = {

    saveLMS(lmsDTO) {
        return instance.post(`/org-admin/lms`, lmsDTO);
    },

    updateLMS(lmsDTO) {
        return instance.put(`/org-admin/lms`, lmsDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    updateLMSName(lmsId, name) {
        return instance.patch(`/org-admin/lms/${lmsId}/name`, {value: name});
    },

    deleteLMS(lmsId) {
        return instance.delete(`/org-admin/lms/${lmsId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllLMSByOrganisationForDropDown() {
        return instance.get(`/department/lms-dropdown/all-lms-by-organisation`);
    },

    //----------------------------------------------For table-----------------------------------------------------------
    fetchAllLMSByOrganisationForTable() {
        return instance.get(`/department/lms-table/all-lms-by-organisation`);
    },
    fetchAllLMSByOrganisationIdForTable(orgId) {
        return instance.get(`/global-admin/lms-table/all-lms-by-organisation`);
    },

}