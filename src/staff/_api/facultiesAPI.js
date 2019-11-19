import {instance} from "../../common/_api/axios";

export const facultiesAPI = {

    fetchAllForDropDownByOrgId() {
        return instance.get(`/department/faculties-dropdown`);
    },
}