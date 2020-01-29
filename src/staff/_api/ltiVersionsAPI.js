import {instance} from "../../common/_api/axios";

export const ltiVersionsAPI = {

    /**
     * Fetch all supported LTI versions;
     * We only support LTI v1.1
     * @returns {Promise<AxiosResponse<T>>}
     */
    fetchAllLtiVersions() {
        return instance.get(`/org-admin/lti-versions-dropdown/all-lti-versions-by-ratos`);
    },
}