import {instance} from "../../common/_api/axios";

export const resultsAPI = {

    fetchDepResults(params) {
        return instance.get(`/department/student-results?${params}`);
    },

    fetchDepResultsWithSpec(params, spec) {
        return instance.post(`/department/student-results?${params}`, spec);
    },
}