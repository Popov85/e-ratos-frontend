import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
// @ts-ignore
import store from "../../../store/configureStore";
// @ts-ignore
import {setAuthorized, setLoggedOut} from "../actions/authActions";
// @ts-ignore
import {resetSession} from "../../session/actions/sessionActions";

const baseUrl: string = process.env.E_RATOS_BASE_URL || '';

// Use origin base URL
export const instance: AxiosInstance = axios.create({
    baseURL: `${baseUrl}/api`,
    withCredentials: true
});

// Response interceptor for handling responses and errors
instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        if (response.status >= 200 && response.status < 300) {
            // console.log("Intercepted 2xx, dispatch authorized!");
            store.dispatch(setAuthorized(true));
        }
        return response;
    },
    (error: AxiosError): Promise<never> => {
        if (error.response && error.response.status === 401) {
            console.warn('Intercepted 401, dispatch logout, reset session!');
            store.dispatch(setLoggedOut());
            store.dispatch(resetSession());
        } else if (error.response && error.response.status === 403) {
            console.warn('Intercepted 403, dispatch unauthorized!');
            store.dispatch(setAuthorized(false));
        }
        return Promise.reject(error);
    }
);