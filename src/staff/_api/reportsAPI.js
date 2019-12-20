import {instance} from "../../common/_api/axios";

export const reportsAPI = {

    /**
     * Fetch report on content: quantity of requested learning materials
     * @param reportOnContentDto
     * @returns {Promise<AxiosResponse<T>>}
     */
    fetchReportOnContent(reportOnContentDto) {
        return instance.post('/dep-admin/report-on-content', reportOnContentDto);
    }
}