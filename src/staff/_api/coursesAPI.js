import {instance} from "../../common/_api/axios";

export const coursesAPI = {

    fetchAllForDropDownByDepartmentId() {
        return instance.get(`/department/courses-dropdown/all-by-department`);
    },
}