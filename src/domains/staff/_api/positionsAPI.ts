import {instance} from "../../common/_api/axios";
import {AxiosResponse} from "axios";
import {Position} from "../types/Position";

export const positionsAPI = {

    async fetchAllPositions(): Promise<Array<Position>> {
        const result: AxiosResponse<Array<Position>> = await instance.get(`/dep-admin/positions-dropdown/all-pos-by-ratos`);
        return result.data;
    }
}