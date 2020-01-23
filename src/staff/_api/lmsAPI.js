import {instance} from "../../common/_api/axios";

export const lmsAPI = {

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllLMSByOrganisationForDropDown() {
        return instance.get(`/department/lms-dropdown/all-lms-by-organisation`);
    },

}