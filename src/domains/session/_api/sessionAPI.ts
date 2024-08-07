import {instance} from "../../common/_api/axios";
import {AxiosResponse} from "axios";
import {SchemeInfo} from "../types/SchemeInfo";
import {BatchInfo} from "../types/BatchInfo";
import {FinishInfo, QuestionResult} from "../types/FinishInfo";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";
import {Stars} from "../types/Stars";
import {Complaint} from "../types/Complaint";
import {Help} from "../types/Help";

export const sessionAPI = {

    // SchemeInfo
    async getSchemeInfo(schemeId: number): Promise<SchemeInfo> {
        const response: AxiosResponse<SchemeInfo> = await instance.get(`/info/schemes/${schemeId}`);
        return response.data;
    },

    // Start session
    async start(schemeId: number, isLMS: boolean): Promise<BatchInfo> {
        const result: AxiosResponse<BatchInfo> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/start?schemeId=${schemeId}`);
        return result.data;
    },

    // Cancel session
    async cancel(schemeId: number, isLMS: boolean): Promise<FinishInfo> {
        const result: AxiosResponse<FinishInfo> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/cancel?schemeId=${schemeId}`);
        return result.data;
    },

    // Next request
    async next(schemeId: number, isLMS: boolean, batch: BatchInfo) {
        //console.log("I am sending batch = ", batch);
        const result: AxiosResponse<BatchInfo> = await instance.post(`${isLMS ? '/lms' : '/student'}/session/next?schemeId=${schemeId}`, batch);
        return result.data;
    },

    // Current request
    async current(schemeId: number, isLMS: boolean): Promise<BatchInfo> {
        const result: AxiosResponse<BatchInfo> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/current?schemeId=${schemeId}`);
        return result.data;
    },

    // Finish request
    async finish(schemeId: number, isLMS: boolean): Promise<FinishInfo> {
        const result: AxiosResponse<FinishInfo> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/finish?schemeId=${schemeId}`);
        return result.data;
    },

    // Finish with last batch request
    async finish_batch(schemeId: number, isLMS: boolean, batch: BatchInfo): Promise<FinishInfo> {
        const result: AxiosResponse<FinishInfo> = await instance.post(`${isLMS ? '/lms' : '/student'}/session/finish-batch?schemeId=${schemeId}`, batch);
        return result.data;
    },

    // Preserve session request
    async preserve(schemeId: number, isLMS: boolean): Promise<Map<string, string>> {
        const result: AxiosResponse<Map<string, string>> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/preserve/${schemeId}`);
        return result.data;
    },

    // Retrieve session request
    async retrieve(key: string, isLMS: boolean): Promise<BatchInfo> {
        const result: AxiosResponse<BatchInfo> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/retrieve/${key}`);
        return result.data;
    },

    // Pause session request
    async pause(schemeId: number, isLMS: boolean): Promise<number> {
        const result: AxiosResponse = await instance.get(`${isLMS ? '/lms' : '/student'}/session/pause/${schemeId}`);
        return result.status;
    },

    // Proceed after pause request
    async proceed(schemeId: number, isLMS: boolean): Promise<number> {
        const result: AxiosResponse = await instance.get(`${isLMS ? '/lms' : '/student'}/session/proceed/${schemeId}`);
        return result.status;
    },

    // Skip request
    async skip(schemeId: number, questionId: number, isLMS: boolean): Promise<number> {
        const result: AxiosResponse = await instance.put(`${isLMS ? '/lms' : '/student'}/session/schemes/${schemeId}/questions/${questionId}/skipped`);
        return result.status;
    },

    // Check for correctness a single response
    async check(schemeId: number, isLMS: boolean, response: ResponseMCQ | ResponseFBSQ): Promise<QuestionResult> {//TODO: add more impl.
        const result: AxiosResponse<QuestionResult> = await instance.post(`${isLMS ? '/lms' : '/student'}/session/check/${schemeId}`, response);
        return result.data;
    },

    // Provide answer for a single question
    async shows(schemeId: number, questionId: number, isLMS: boolean): Promise<QuestionResult> {
        const result: AxiosResponse<QuestionResult> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/check/${schemeId}/${questionId}`);
        return result.data;
    },

    // Get a single question starred with up to 5 stars
    async star(schemeId: number, questionId: number, isLMS: boolean, stars: Stars): Promise<number> {
        const result: AxiosResponse = await instance.post(`${isLMS ? '/lms' : '/student'}/session/schemes/${schemeId}/questions/${questionId}/starred`, stars);
        return result.status;
    },

    // Report/complain about a single question
    async report(schemeId: number, questionId: number, isLMS: boolean, complaint: Complaint): Promise<number> {
        const result: AxiosResponse = await instance.post(`${isLMS ? '/lms' : '/student'}/session/schemes/${schemeId}/questions/${questionId}/complained`, complaint);
        return result.status;
    },

    // Get help if any for a single question
    async help(schemeId: number, questionId: number, isLMS: boolean): Promise<Help> {
        const result: AxiosResponse<Help> = await instance.get(`${isLMS ? '/lms' : '/student'}/session/schemes/${schemeId}/questions/${questionId}/helped`);
        return result.data;
    }
}

export default sessionAPI;