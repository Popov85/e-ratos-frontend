import {instance} from "../../common/_api/axios";
import {Department} from "../types/Department";
import {AxiosResponse} from "axios";

export type DepartmentInput = Omit<Department, 'faculty'> & {
    facId: number;
};

export const departmentsAPI = {

    async saveDep(dep: DepartmentInput): Promise<Department> {
        const result: AxiosResponse<Department> = await instance.post(`/fac-admin/departments`, dep);
        return result.data;
    },

    async updateDep(dep: DepartmentInput): Promise<Department> {
        const result: AxiosResponse<Department> = await instance.put(`/fac-admin/departments`, dep);
        return result.data;
    },

    async updateDepName(depId: number, name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/fac-admin/departments/${depId}/name`, {value: name});
        return result.status;
    },

    async deleteDep(depId: number): Promise<number> {
        const result: AxiosResponse = await instance.delete(`/fac-admin/departments/${depId}`);
        return result.status;
    },

    //------------------------------------------------For drop-down-----------------------------------------------------

    async fetchAllDepartmentsByFacultyForDropDown(): Promise<Array<Department>> {
        const result: AxiosResponse<Array<Department>> = await instance.get(`/fac-admin/departments-dropdown/all-dep-by-faculty`);
        return result.data;
    },

    async fetchAllDepartmentsByFacultyIdForDropDown(facId: number): Promise<Array<Department>> {
        const result: AxiosResponse<Array<Department>> = await instance.get(`/org-admin/departments-dropdown/all-dep-by-faculty?facId=${facId}`);
        return result.data;
    },

    //-----------------------------------------------For table----------------------------------------------------------

    async fetchAllDepartmentsByFacultyForTable(): Promise<Array<Department>> {
        const result: AxiosResponse<Array<Department>> = await instance.get(`/fac-admin/departments-table/all-dep-by-faculty`);
        return result.data;
    },

    async fetchAllDepartmentsByOrganisationForTable(): Promise<Array<Department>> {
        const result: AxiosResponse<Array<Department>> = await instance.get(`/org-admin/departments-table/all-dep-by-organisation`);
        return result.data;
    },

    async fetchAllDepartmentsByRatosForTable(): Promise<Array<Department>> {
        const result: AxiosResponse<Array<Department>> = await instance.get(`/global-admin/departments-table/all-dep-by-ratos`);
        return result.data;
    }

}