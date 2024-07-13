import {instance} from "./axios";
import {Credentials} from "../types/Credentials";
import {RegOptions} from "../types/RegOptions";
import {UserInfo} from "../types/UserInfo";
import {AxiosResponse} from "axios";
import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Class} from "../types/Class";
import {Student} from "../types/Student";


export const appAPI = {

    async doLogin(credentials: Credentials): Promise<number> {
        const response: AxiosResponse = await instance.post<string>('/login', credentials, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return response.status;
    },

    async doLogout(): Promise<number> {
        const response: AxiosResponse = await instance.post("/logout");
        return response.status;
    },

    async fetchRegOptions(): Promise<RegOptions> {
        const response: AxiosResponse<RegOptions> = await instance.get('/self-registration/options');
        return response.data;
    },

    async fetchUserInfo(): Promise<UserInfo> {
        const response: AxiosResponse<UserInfo> = await instance.get("/info/user");
        return response.data;
    },

    // Derived from LMS current organization ID
    async fetchDerivedOrganisation(): Promise<number> {
        const response: AxiosResponse<number> = await instance.get(`/lti/self-registration/organisation`);
        return response.data;
    },

    async fetchOrganisations(isLMS: boolean): Promise<Array<Organisation>> {
        const response: AxiosResponse<Array<Organisation>> = await instance.get(`${isLMS ? '/lti' : ''}/self-registration/organisations`);
        return response.data;
    },

    async fetchFaculties(orgId: number, isLMS: boolean): Promise<Array<Faculty>> {
        const response: AxiosResponse<Array<Faculty>> = await instance.get(`${isLMS ? '/lti' : ''}/self-registration/faculties?orgId=${orgId}`);
        return response.data;
    },

    async fetchClasses(facId: number, isLMS: boolean): Promise<Array<Class>> {
        const response: AxiosResponse<Array<Class>> = await instance.get(`${isLMS ? '/lti' : ''}/self-registration/classes?facId=${facId}`);
        return response.data;
    },

    async register(student: Student, isLMS: boolean): Promise<void> {
        await instance.post(`${isLMS ? '/lti' : ''}/sign-up`, student);
    }
}

export default appAPI;