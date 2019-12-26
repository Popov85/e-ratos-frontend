import {instance} from "../../common/_api/axios";

/**
 * All endpoints are universal and provide reports based on input params;
 * The higher is a user's role - the more detailed is the output report!
 * @type {{fetchReportOnResults(*=): Promise<AxiosResponse<T>>, fetchReportOnContent(*=): Promise<AxiosResponse<T>>}}
 */
export const reportsAPI = {

    /**
     * Fetch a report on content: quantity of requested learning materials (columns)
     * @param requestedColumns
     * @returns {Promise<AxiosResponse<T>>}
     */
    fetchReportOnContent(requestedColumns) {
        return instance.post('/department/report-on-content', requestedColumns);
    },

    /**
     * Fetch a report on results, unlimited in size set of results according to restricting params;
     * @param restrictingParams
     * @returns {Promise<AxiosResponse<T>>}
     */
    fetchReportOnResults(restrictingParams) {
        console.log("restrictingParams = ", restrictingParams);
        return instance.post('/department/report-on-results', restrictingParams);
    },
}