import {instance} from "../../common/_api/axios";

export const organisationsAPI = {

    fetchAllOrganisationsForDropDown() {
        return instance.get(`/global-admin/organisations-dropdown/all-org-by-ratos`);
    },
}