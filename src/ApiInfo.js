import Utils from './Utils';

const panelUrl = "/info/panel";
const schemeUrl = "/info/schemes/";

const ApiInfo = {

      // Context info for learning session
      panelInfo: function() {
        const endpoint = panelUrl;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
        }).then(response => {
            if (!response.ok) throw Error("Failed to load panel info");
            return response.json();
        });
    },

    // Scheme info for learning session
    schemeInfo: function(schemeId) {
        const endpoint = schemeUrl;
        const url = Utils.baseUrl() + endpoint + schemeId;
        return fetch(url, {
            method: 'GET',
        }).then(response => {
            if (!response.ok) throw Error("Failed to load scheme info");
            return response.json();
        });
    },
}

export default ApiInfo;


