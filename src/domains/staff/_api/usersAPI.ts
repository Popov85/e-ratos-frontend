import {instance} from "../../common/_api/axios";
import {AxiosResponse} from "axios";
import {Staff} from "../types/Staff";

export const usersAPI = {

    async saveStaff(staff: Staff): Promise<Staff> {
        const result: AxiosResponse<Staff> = await instance.post(`/dep-admin/staff`, staff);
        return result.data;
    },

    async updateStaff(staff: Staff): Promise<Staff> {
        const result: AxiosResponse<Staff> = await instance.put(`/dep-admin/staff`, staff);
        return result.data;
    },

    async deleteStaff(staffId: number): Promise<number> {
        const result: AxiosResponse = await instance.delete(`/dep-admin/staff/${staffId}`);
        return result.status;
    },

    //---------------------------------------------Patches on user------------------------------------------------------

    async updateUserName(userId: number, name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/dep-admin/users/${userId}/name`, {value: name});
        return result.status;
    },

    async updateUserSurname(userId: number, surname: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/dep-admin/users/${userId}/surname`, {value: surname});
        return result.status;
    },

    async updateUserEmail(userId: number, email: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/dep-admin/users/${userId}/email`, {email: email});
        return result.status;
    },

    //------------------------------------------------SET-s-------------------------------------------------------------
    async fetchAllStaffByDepartment(): Promise<Array<Staff>> {
        const result: AxiosResponse<Array<Staff>> = await instance.get(`/dep-admin/staff-table/all-staff-by-department`);
        return result.data;
    },

    async fetchAllStaffByFaculty(): Promise<Array<Staff>> {
        const result: AxiosResponse<Array<Staff>> = await  instance.get(`/fac-admin/staff-table/all-staff-by-faculty`);
        return result.data;
    },

    async fetchAllStaffByOrganisation(): Promise<Array<Staff>> {
        const result: AxiosResponse<Array<Staff>> = await  instance.get(`/org-admin/staff-table/all-staff-by-organisation`);
        return result.data;
    },

    async fetchAllStaffByRatos(): Promise<Array<Staff>> {
        const result: AxiosResponse<Array<Staff>> = await  instance.get(`/global-admin/staff-table/all-staff-by-ratos`);
        return result.data;
    }
}