import {instance} from "../../common/_api/axios";
import {Profile} from "../types/Profile";
import {Password} from "../types/Password";

export const profileAPI = {

    async updateProfile(profile: Profile): Promise<void> {
        return await instance.put("/user/profile", profile);
    },

    async updatePassword(password: Password): Promise<void> {
        return await instance.put(`/user/profile/password`, password);
    }
}