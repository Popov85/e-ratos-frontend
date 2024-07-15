import {instance} from "./axios";
import {RegOptions} from "../types/RegOptions";
import {AxiosResponse} from "axios";
import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Class} from "../types/Class";
import {Student} from "../types/Student";


export const registrationAPI = {

    async fetchRegOptions(): Promise<RegOptions> {
        const response: AxiosResponse<RegOptions> = await instance.get('/self-registration/options');
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
};

export default registrationAPI;