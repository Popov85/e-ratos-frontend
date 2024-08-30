import {instance} from "../../common/_api/axios";
import {LMS} from "../types/LMS";
import {AxiosResponse} from "axios";

export type LMSDropDown = Pick<LMS, 'lmsId' | 'name'>;

export const lmsAPI = {

    async saveLMS(lms: LMS): Promise<LMS> {
        const result: AxiosResponse<LMS> = await instance.post(`/org-admin/lms`, lms);
        return result.data;
    },

    async updateLMS(lms: LMS): Promise<LMS> {
        const result: AxiosResponse<LMS> = await instance.put(`/org-admin/lms`, lms);
        return result.data;
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    async updateLMSName(lmsId: number, name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/org-admin/lms/${lmsId}/name`, {value: name});
        return result.status;
    },

    async deleteLMS(lmsId: number): Promise<number>   {
        const result: AxiosResponse = await instance.delete(`/org-admin/lms/${lmsId}`);
        return result.status;
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    async fetchAllLMSByOrganisationForDropDown(): Promise<Array<LMSDropDown>> {
        const result: AxiosResponse<Array<LMSDropDown>> = await instance.get(`/department/lms-dropdown/all-lms-by-organisation`);
        return result.data;
    },

    //----------------------------------------------For table-----------------------------------------------------------
    async fetchAllLMSByOrganisationForTable(): Promise<Array<LMS>>  {
        const result: AxiosResponse<Array<LMS>> = await instance.get(`/department/lms-table/all-lms-by-organisation`);
        return result.data;
    },

    async fetchAllLMSByOrganisationIdForTable(orgId?: number): Promise<Array<LMS>> {
        const params = orgId ? { orgId: orgId } : {};
        const result: AxiosResponse<Array<LMSDropDown>> = await instance.get(`/global-admin/lms-table/all-lms-by-organisation`, {params});
        return result.data;
    }

}