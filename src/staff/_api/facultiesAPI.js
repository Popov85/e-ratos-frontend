import {instance} from "../../common/_api/axios";

export const facultiesAPI = {

    fetchAllFacultiesByOrganisationForDropDown() {
        return instance.get(`/department/faculties-dropdown/all-by-organisation`);
    },

    fetchAllFacultiesByOrganisationIdForDropDown(orgId) {
        return instance.get(`/global-admin/faculties-dropdown/all-by-organisation?orgId=${orgId}`);
    },
}