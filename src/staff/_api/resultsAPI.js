import {instance} from "../../common/_api/axios";

export const resultsAPI = {

    fetchDepResults(params) {
        return instance.get(`/department/student-results?${params}`);
    },

    fetchDepResultsWithSpec(params, spec) {
        return instance.post(`/department/student-results?${params}`, spec);
    },

    // For any admin {fac/org/global}

    fetchDepResultsAdmin(depId, params) {
        return instance.get(`/fac-admin/student-results?depId=${depId}&${params}`);
    },

    fetchDepResultsWithSpecAdmin(depId, params, spec) {
        return instance.post(`/fac-admin/student-results?depId=${depId}&${params}`, spec);
    },

}