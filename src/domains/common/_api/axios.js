import axios from "axios";
const baseUrl = process.env.E_RATOS_BASE_URL;
import store from "../../../store/configureStore";
import {setAuthorized, setLoggedOut} from "../actions/authActions";
import {resetSession} from "../../session/actions/sessionActions";

// Use origin base URL
export const instance = axios.create({
    baseURL: `${baseUrl}/api`,
    withCredentials: true
});

instance.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            //console.log("Intercepted 2xx, dispatch authorized!");
            store.dispatch(setAuthorized(true));
        }
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.warn("Intercepted 401, dispatch logout, reset session!");
            store.dispatch(setLoggedOut());
            store.dispatch(resetSession());
        } else if (error.response.status === 403) {
            console.warn("Intercepted 403, dispatch unauthorized!");
            store.dispatch(setAuthorized(false));
        }
        return Promise.reject(error);
    }
);