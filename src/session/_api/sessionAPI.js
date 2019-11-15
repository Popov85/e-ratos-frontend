import {instance} from "../../common/_api/axios";

export const sessionAPI = {

    // SchemeInfo
    getSchemeInfo(schemeId) {
        return instance.get(`/info/schemes/${schemeId}`);
    },

    // Start session
    start(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/start?schemeId=${schemeId}`);
    },

    // Cancel session
    cancel(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/cancel?schemeId=${schemeId}`);
    },

    // Next request
    next(schemeId, isLMS, batch) {
        //console.log("I am sending batch = ", batch);
        return instance.post(`${isLMS===true ? '/lms':'/student'}/session/next?schemeId=${schemeId}`, batch);
    },

    // Current request
    current(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/current?schemeId=${schemeId}`);
    },

    // Finish request
    finish(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/finish?schemeId=${schemeId}`);
    },

    // Finish with last batch request
    finish_batch(schemeId, isLMS, batch) {
        return instance.post(`${isLMS===true ? '/lms':'/student'}/session/finish-batch?schemeId=${schemeId}`, batch);
    },

    // Preserve session request
    preserve(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/preserve/${schemeId}`);
    },

    // Retrieve session request
    retrieve(key, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/retrieve/${key}`);
    },

    // Pause session request
    pause(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/pause/${schemeId}`);
    },

    // Proceed after pause request
    proceed(schemeId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/proceed/${schemeId}`);
    },

    // Skip request
    skip(schemeId, questionId, isLMS) {
        return instance.put(`${isLMS===true ? '/lms':'/student'}/session/schemes/${schemeId}/questions/${questionId}/skipped`);
    },

    // Check for correctness a single response
    check(schemeId, isLMS, response) {
        return instance.post(`${isLMS===true ? '/lms':'/student'}/session/check/${schemeId}`, response);
    },

    // Provide answer for a single question
    shows(schemeId, questionId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/check/${schemeId}/${questionId}`);
    },

    // Get a single question starred with up to 5 stars
    star(schemeId, questionId, isLMS, stars) {
        return instance.post(`${isLMS===true ? '/lms':'/student'}/session/schemes/${schemeId}/questions/${questionId}/starred`, stars);
    },

    // Report/complain about a single question
    report(schemeId, questionId, isLMS, report) {
        return instance.post(`${isLMS===true ? '/lms':'/student'}/session/schemes/${schemeId}/questions/${questionId}/complained`, report);
    },

    // Get help if any for a single question
    help(schemeId, questionId, isLMS) {
        return instance.get(`${isLMS===true ? '/lms':'/student'}/session/schemes/${schemeId}/questions/${questionId}/helped`);
    }
}

export default sessionAPI;