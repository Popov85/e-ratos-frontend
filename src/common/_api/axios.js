import axios from "axios";
import utils from "../../utils/utils";

// Use origin base URL
export const instance = axios.create({
    baseURL: utils.baseUrl()
});