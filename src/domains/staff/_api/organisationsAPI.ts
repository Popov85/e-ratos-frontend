import {instance} from "../../common/_api/axios";
import {AxiosResponse} from "axios";
import {Organisation} from "../types/Organisation";

// TODO: consider merge save and update API calls!
export const organisationsAPI = {

    async saveOrg(org: Organisation): Promise<Organisation> {
        const result: AxiosResponse<Organisation> = await instance.post(`/global-admin/organisations`, org);
        return result.data;
    },

    async updateOrg(org: Organisation): Promise<Organisation> {
        const result: AxiosResponse<Organisation> = await instance.put(`/global-admin/organisations`, org);
        return result.data;
    },

    async updateOrgName(orgId: number, name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/global-admin/organisations/${orgId}/name`, {value: name});
        return result.status;
    },

    async deleteOrg(orgId: number): Promise<number> {
        const result: AxiosResponse = await instance.delete(`/global-admin/organisations/${orgId}`);
        return result.status;
    },

    //---------------------------------------------------Drop-down/table------------------------------------------------

    async fetchAllOrganisationsForDropDown(): Promise<Array<Organisation>> {
        const result: AxiosResponse<Array<Organisation>> = await instance.get(`/global-admin/organisations-dropdown/all-org-by-ratos`);
        return result.data;
    }
}