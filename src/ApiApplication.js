import Utils from './Utils';

const logoutUrl = "/logout";

const ApiApplication = {

    // Logout
    logout: function () {
        const endpoint = logoutUrl;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'POST',
        }).then(response => {
            if (!response.ok) throw Error("Failed logout request...");
            return response.text();
        });
    }
}

export default ApiApplication;


