import {instance} from "../../common/_api/axios";
import utils from "../../utils/utils";

export const loginURL = `${utils.baseUrl()}/login`;

export const appAPI = {

    doLogin(credentials) {
        return fetch(loginURL, {method: 'POST', headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }), body: credentials});
    },

    // TODO: check
    doLogin2(credentials) {
        const formData = new FormData();
        formData.append('body', credentials);
        const config = {headers: new Headers( {'Content-Type': 'application/x-www-form-urlencoded'})};
        return instance.post(loginURL, formData, config);
    },

    doLogout() {
        return instance.post("/logout");
    },

    fetchRegOptions() {
        return instance.get("/self-registration/options");
    },

    fetchUserInfo() {
        return instance.get("/info/user");
    },

    // Derived from LMS current organization info
    fetchDerivedOrganisation() {
        return instance.get(`/lti/self-registration/organisation`);
    },

    fetchOrganisations(isLMS) {
        return instance.get(`${isLMS===true ? '/lti':''}/self-registration/organisations`);
    },

    fetchFaculties(orgId, isLMS) {
        return instance.get(`${isLMS===true ? '/lti':''}/self-registration/faculties?orgId=${orgId}`);
    },

    fetchClasses(facId, isLMS) {
        return instance.get(`${isLMS===true ? '/lti':''}/self-registration/classes?facId=${facId}`);
    },

    register(userData, isLMS) {
        return instance.post(`${isLMS===true ? '/lti':''}/sign-up`, userData);
    }
}

export default appAPI;