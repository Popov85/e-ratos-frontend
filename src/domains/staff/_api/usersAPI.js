import {instance} from "../../common/_api/axios";

export const usersAPI = {

    saveStaff(staffDTO) {
        return instance.post(`/dep-admin/staff`, staffDTO);
    },

    updateStaff(staffDTO) {
        return instance.put(`/dep-admin/staff`, staffDTO);
    },

    deleteStaff(staffId) {
        return instance.delete(`/dep-admin/staff/${staffId}`);
    },

    //---------------------------------------------Patches on user------------------------------------------------------

    updateUserName(userId, name) {
        return instance.patch(`/dep-admin/users/${userId}/name`, {value: name});
    },

    updateUserSurname(userId, surname) {
        return instance.patch(`/dep-admin/users/${userId}/surname`, {value: surname});
    },

    updateUserEmail(userId, email) {
        return instance.patch(`/dep-admin/users/${userId}/email`, {email: email});
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
    }
}