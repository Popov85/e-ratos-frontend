import {instance} from "../../common/_api/axios";
import Utils from "../../utils/Utils";

export const loginURL = `${Utils.baseUrl()}/login`;

export const appAPI = {

    //Login
    doLogin(credentials) {
        return fetch(loginURL, {method: 'POST', headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }), body: credentials});
    },

    //Logout
    doLogout() {
        return instance.post("/logout");
    },

    fetchRegOptions() {
        return instance.get("/self-registration/options");
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