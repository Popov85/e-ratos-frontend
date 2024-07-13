import {instance} from "./axios";

export const profileAPI = {

    updateProfile(profile) {
        return instance.put("/user/profile", profile);
    },

    updatePassword(passwords) {
        return instance.put(`/user/profile/password`, passwords);
    },
}