import {instance} from "../../common/_api/axios";

export const resultsAPI = {

    fetchMyResults(spec) {
        return instance.post(`/student/self-results`, spec);
    }

}