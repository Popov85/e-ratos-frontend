import {instance} from "../../common/_api/axios";

export const facultiesAPI = {

    fetchAllFacultiesByOrganisationForDropDown() {
        return instance.get(`/department/faculties-dropdown/all-fac-by-organisation`);
    },

    fetchAllFacultiesByOrganisationIdForDropDown(orgId) {
        return instance.get(`/global-admin/faculties-dropdown/all-fac-by-organisation?orgId=${orgId}`);
    },
}