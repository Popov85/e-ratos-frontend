import {instance} from "./axios";
import {Credentials} from "../types/Credentials";
import {UserInfo} from "../types/UserInfo";
import {AxiosResponse} from "axios";


export const authAPI = {

    async doLogin(credentials: Credentials): Promise<number> {
        const response: AxiosResponse = await instance.post<string>('/login', credentials, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return response.status;
    },

    async doLogout(): Promise<number> {
        const response: AxiosResponse = await instance.post("/logout");
        return response.status;
    },

    async fetchUserInfo(): Promise<UserInfo> {
        const response: AxiosResponse<UserInfo> = await instance.get("/info/user");
        return response.data;
    }
}

export default authAPI;