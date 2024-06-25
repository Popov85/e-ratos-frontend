import {instance} from "../../common/_api/axios";

export const resultDetailsAPI = {

    fetchResultDetails(resultId) {
        return instance.get(`/department/student-result-details?resultId=${resultId}`);
    }

}