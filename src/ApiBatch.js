import Utils from './Utils';
import UtilsResponse from './UtilsResponse';

const startUrl = "/session/start";
const cancelUrl = "/session/cancel";
const nextUrl = "/session/next";
const currentUrl = "/session/current";
const finishUrl = "/session/finish";
const finishBatchUrl = "/session/finish-batch";
// Educational session
const preserveUrl = "/session/preserve";
const retrieveUrl = "/session/retrieve";

const pauseUrl = "/session/pause";
const proceedUrl = "/session/proceed";

const checkUrl = "/session/check";

const ApiBatch = {

    start: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + startUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    next: function (schemeId, batch, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + nextUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                'Accept': 'application/json'
            }),
            body: batch
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    current: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + currentUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    cancel: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + cancelUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    finish: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + finishUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' }),
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    finish_batch: function (schemeId, batch, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + finishBatchUrl + "?schemeId=" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: batch
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    preserve: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + preserveUrl + "/" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    retrieve: function (key, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + retrieveUrl + "/" + key;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    pause: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + pauseUrl + "/" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET'
        }).then(response => {
            return UtilsResponse.processNoBody(response);
        });
    },

    proceed: function (schemeId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + proceedUrl + "/" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'GET'
        }).then(response => {
            return UtilsResponse.processNoBody(response);
        });
    },

    skip: function (schemeId, lms, questionId) {
        const endpoint = (lms === true ? "/lms" : "/student") + "/session/schemes/" + schemeId + "/questions/" + questionId + "/skipped";
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'PUT'
        }).then(response => {
            return UtilsResponse.processNoBody(response);
        });
    },

    check: function (schemeId, single, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + checkUrl + "/" + schemeId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                'Accept': 'application/json'
            }),
            body: single
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    shows: function (schemeId, questionId, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + checkUrl + "/" + schemeId + "/" + questionId;
        const url = Utils.baseUrl() + endpoint;
        return fetch(url, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                'Accept': 'application/json'
            })
        }).then(response => {
            return UtilsResponse.process(response);
        });
    },

    star: function (schemeId, questionId, stars, lms) {
        const endpoint = (lms === true ? "/lms" : "/student") + "/session/schemes/" + schemeId + "/questions/" + questionId + "/starred";
        const url = Utils.baseUrl() + endpoint;
        const dto = {};
        dto.questionId = questionId;
        dto.stars = stars;
        return fetch(url, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(dto)
        }).then(response => {
            return UtilsResponse.processNoBody(response);
        });
    }

}

export default ApiBatch;


