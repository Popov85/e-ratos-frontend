import {instance} from "../../common/_api/axios";

export const positionsAPI = {

    fetchAllPositions() {
        return instance.get(`/dep-admin/positions`);
    },
}