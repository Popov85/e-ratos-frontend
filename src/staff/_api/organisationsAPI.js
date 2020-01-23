import {instance} from "../../common/_api/axios";

export const organisationsAPI = {

    saveOrg(orgDTO) {
        return instance.post(`/global-admin/organisations`, orgDTO);
    },

    updateOrg(orgDTO) {
        return instance.put(`/global-admin/organisations`, orgDTO);
    },

    updateOrgName(orgId, name) {
        return instance.patch(`/global-admin/organisations/${orgId}/name`, {value: name});
    },

    deleteOrg(orgId) {
        return instance.delete(`/global-admin/organisations/${orgId}`);
    },

    //---------------------------------------------------Drop-down/table------------------------------------------------

    fetchAllOrganisationsForDropDown() {
        return instance.get(`/global-admin/organisations-dropdown/all-org-by-ratos`);
    },
}