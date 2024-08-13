import {instance} from "../../common/_api/axios";
import {Faculty} from "../types/Faculty";
import {AxiosResponse} from "axios";

export type FacultyInput = Omit<Faculty, 'organisation'> & {
    orgId: number;
};

export const facultiesAPI = {

    async saveFac(fac: FacultyInput): Promise<Faculty> {
        const result: AxiosResponse<Faculty>  = await instance.post(`/org-admin/faculties`, fac);
        return result.data;
    },

    async updateFac(fac: FacultyInput): Promise<Faculty> {
        const result: AxiosResponse<Faculty> = await instance.put(`/org-admin/faculties`, fac);
        return result.data;
    },

    async updateFacName(facId: number, name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/org-admin/faculties/${facId}/name`, {value: name});
        return result.status;
    },

    async deleteFac(facId: number): Promise<number> {
        const result: AxiosResponse = await instance.delete(`/org-admin/faculties/${facId}`);
        return result.status;
    },

    //--------------------------------------------Min set-s of information----------------------------------------------

    async fetchAllFacultiesByOrganisationForDropDown(): Promise<Array<Faculty>> {
        const result: AxiosResponse<Array<Faculty>> = await instance.get(`/department/faculties-dropdown/all-fac-by-organisation`);
        return result.data;
    },

    async fetchAllFacultiesByOrganisationIdForDropDown(orgId: number): Promise<Array<Faculty>> {
        const result: AxiosResponse<Array<Faculty>> = await instance.get(`/global-admin/faculties-dropdown/all-fac-by-organisation?orgId=${orgId}`);
        return result.data;
    },

    //--------------------------------------These set-s include organisation info as well-------------------------------
    async fetchAllFacultiesByOrganisationForTable(): Promise<Array<Faculty>> {
        const result: AxiosResponse<Array<Faculty>> = await instance.get(`/org-admin/faculties-table/all-fac-by-organisation`);
        return result.data;
    },

    async fetchAllFacultiesByRatosForTable(): Promise<Array<Faculty>> {
        const result: AxiosResponse<Array<Faculty>> = await instance.get(`/global-admin/faculties-table/all-fac-by-ratos`);
        return result.data;
    }
}