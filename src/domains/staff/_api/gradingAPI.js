import {instance} from "../../common/_api/axios";

export const gradingAPI = {
    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllGradingsByRatosForDropDown() {
        return instance.get(`/department/gradings-dropdown/all-gradings-by-ratos`);
    },

}