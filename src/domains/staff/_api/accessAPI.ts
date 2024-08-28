import {instance} from "../../common/_api/axios";
import {AxiosResponse} from "axios";
import {Access} from "../types/Access";

export const accessAPI = {
    //--------------------------------------------Min set-s of information----------------------------------------------
    async fetchAllAccessesByRatosForDropDown(): Promise<Array<Access>> {
        const result: AxiosResponse<Array<Access>> = await instance.get(`/department/accesses-dropdown/all-accesses-by-ratos`);
        return result.data;
    }
}