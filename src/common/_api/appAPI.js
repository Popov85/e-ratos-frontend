import {instance} from "../../common/_api/axios";

export const appAPI = {
    // Logout
    doLogout() {
        return instance.post("/logout");
    }
}

export default appAPI;