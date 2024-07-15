import {instance} from "../../common/_api/axios";

export const profileAPI = {

    updateProfile(profile) {
        return instance.put("/user/profile", profile);
    },

    updatePassword(passwords) {
        return instance.put(`/user/profile/password`, passwords);
    },
}