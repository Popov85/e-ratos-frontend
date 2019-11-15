import utils from '../../utils/utils';

const RegistrAPI = {

       //Single organization (from LMS context)
       loadOrganization: function (errorLoadOrgId) {
        const endpoint = "/lti/self-registration/organisation";
        const url = utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            if (!response.ok) throw Error("Failed API request for orgId");
            return response.json();
        }).catch(error => {
            console.error(error.message);
            errorLoadOrgId(error);
        })
    },

    //Organizations
    loadOrganizations: function (lms, errorLoadOrg) {
        const endpoint = (lms===true ? "/lti": "") + "/self-registration/organisations";
        const url = utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            if (!response.ok) throw Error("Failed API request for organizations");
            return response.json();
        }).catch(error => {
            console.error(error.message);
            errorLoadOrg(error);
        })
    },

    //Faculties
    loadFaculties: function (lms, orgId, errorLoadFac) {
        const endpoint = (lms===true ? "/lti": "")+ "/self-registration/faculties?orgId=" + orgId;
        const url = utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            if (!response.ok) throw Error("Failed API request for faculties");
            return response.json();
        }).catch(error => {
            console.error(error.message);
            errorLoadFac(error);
        })
    },

    //Classes
    loadClasses: function (lms, facId, errorLoadClasses) {
        const endpoint = (lms===true ? "/lti": "")+"/self-registration/classes?facId=" + facId;
        const url = utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            if (!response.ok) throw Error("Failed API request for classes");
            return response.json();
        }).catch(error => {
            console.error(error.message);
            errorLoadClasses(error);
        })
    }
}

export default RegistrAPI;


