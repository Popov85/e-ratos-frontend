import {instance} from "../../common/_api/axios";

export const appAPI = {

    doLogin(credentials) {
        return instance.post("/login", credentials, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
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
        return instance.get(`${isLMS === true ? '/lti' : ''}/self-registration/organisations`);
    },

    fetchFaculties(orgId, isLMS) {
        return instance.get(`${isLMS === true ? '/lti' : ''}/self-registration/faculties?orgId=${orgId}`);
    },

    fetchClasses(facId, isLMS) {
        return instance.get(`${isLMS === true ? '/lti' : ''}/self-registration/classes?facId=${facId}`);
    },

    register(userData, isLMS) {
        return instance.post(`${isLMS === true ? '/lti' : ''}/sign-up`, userData);
    }
}

export default appAPI;