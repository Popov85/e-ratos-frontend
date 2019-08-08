import Utils from './Utils';
import UtilsResponse from './UtilsResponse';

const startUrl = "/session/start";
const cancelUrl = "/session/cancel";
const nextUrl = "/session/next";
const currentUrl = "/session/current";
const finishUrl = "/session/finish";
const finishBatchUrl = "/session/finish-batch";

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
    }
}

export default ApiBatch;


