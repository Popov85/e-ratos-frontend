import {instance} from "../../common/_api/axios";

export const accessAPI = {
    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllAccessesByRatosForDropDown() {
        return instance.get(`/department/accesses-dropdown/all-accesses-by-ratos`);
    },

}