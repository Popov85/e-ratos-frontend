import {instance} from "../../common/_api/axios";

export const facultiesAPI = {

    saveFac(facDTO) {
        return instance.post(`/org-admin/faculties`, facDTO);
    },

    updateFac(facDTO) {
        return instance.put(`/org-admin/faculties`, facDTO);
    },

    updateFacName(facId, name) {
        return instance.patch(`/org-admin/faculties/${facId}/name`, {value: name});
    },

    deleteFac(facId) {
        return instance.delete(`/org-admin/faculties/${facId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------

    fetchAllFacultiesByOrganisationForDropDown() {
        return instance.get(`/department/faculties-dropdown/all-fac-by-organisation`);
    },

    fetchAllFacultiesByOrganisationIdForDropDown(orgId) {
        return instance.get(`/global-admin/faculties-dropdown/all-fac-by-organisation?orgId=${orgId}`);
    },

    //--------------------------------------These set-s include organisation info as well-------------------------------
    fetchAllFacultiesByOrganisationForTable() {
        return instance.get(`/org-admin/faculties-table/all-fac-by-organisation`);
    },

    /*fetchAllFacultiesByOrganisationIdForTable(orgId) {
        return instance.get(`/global-admin/faculties-table/all-fac-by-organisation?orgId=${orgId}`);
    },*/

    fetchAllFacultiesByRatosForTable() {
        return instance.get(`/global-admin/faculties-table/all-fac-by-ratos`);
    },
}