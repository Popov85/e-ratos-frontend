import {instance} from "../../common/_api/axios";

export const strategyAPI = {

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllStrategiesByRatosForDropDown() {
        return instance.get(`/department/strategies-dropdown/all-strategies-by-ratos`);
    },

}