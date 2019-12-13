import {instance} from "../../common/_api/axios";

export const usersAPI = {

    saveStaff(staffDTO) {
        return instance.post(`/dep-admin/staff`, staffDTO);
    },

    updateStaff(staffDTO) {
        return instance.put(`/dep-admin/staff`, staffDTO);
    },

    updateUserName(userId, name) {
        return instance.put(`/dep-admin/users/${userId}/update-name?name=${name}`);
    },

    updateUserSurname(userId, surname) {
        return instance.put(`/dep-admin/users/${userId}/update-surname?surname=${surname}`);
    },

    updateUserEmail(userId, email) {
        let obj = {};
        obj.email = email;
        return instance.put(`/dep-admin/users/${userId}/update-email`, obj);
    },

    updateUserPassword(userId, password) {
        return instance.put(`/dep-admin/users/${userId}/update-password?password=${password}`);
    },

    enable(userId) {
        return instance.put(`/dep-admin/users/${userId}/enable`);
    },

    disable(userId) {
        return instance.put(`/dep-admin/users/${userId}/disable`);
    },

    updateStaffPosition(staffId, positionId) {
        return instance.put(`/dep-admin/staff/${staffId}/update-position?positionId=${positionId}`);
    },

    updateStaffRole(staffId, role) {
        return instance.put(`/dep-admin/staff/${staffId}/update-role?role=${role}`);
    },

    //------------------------------------------------SET-s-------------------------------------------------------------
    fetchAllStaffByDepartment() {
        return instance.get(`/dep-admin/staff-table/all-staff-by-department`);
    },

    fetchAllStaffByFaculty() {
        return instance.get(`/fac-admin/staff-table/all-staff-by-faculty`);
    },

    fetchAllStaffByOrganisation() {
        return instance.get(`/org-admin/staff-table/all-staff-by-organisation`);
    },

    fetchAllStaffByRatos() {
        return instance.get(`/global-admin/staff-table/all-staff-by-ratos`);
    },
}