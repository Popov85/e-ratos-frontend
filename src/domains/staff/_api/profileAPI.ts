import {instance} from "../../common/_api/axios";
import {Profile} from "../types/Profile";
import {Password} from "../types/Password";
import {AxiosResponse} from "axios";

export const profileAPI = {

    async updateProfile(profile: Profile): Promise<number> {
        const result: AxiosResponse = await instance.put("/user/profile", profile);
        return result.status;
    },

    async updatePassword(password: Password): Promise<number> {
        const result: AxiosResponse = await instance.put(`/user/profile/password`, password);
        return result.status;
    }
}