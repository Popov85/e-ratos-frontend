import axios from "axios";
import Utils from "../../utils/Utils";

// Use origin base URL
export const instance = axios.create({
    baseURL: Utils.baseUrl()
});