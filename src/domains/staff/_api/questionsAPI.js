import {instance} from "../../common/_api/axios";

export const questionsAPI = {

    saveQuestionMcq(questionMcqDTO) {
        return instance.post(`/instructor/questions-mcq`, questionMcqDTO);
    },

    saveQuestionsMcqFromFile(file, themeId, confirmed) {
        const formData = new FormData();
        formData.append('file', file);
        const config = {headers: new Headers({'Content-Type': 'multipart/form-data'})};
        return instance.post(`/instructor/questions-mcq-file?themeId=${themeId}&confirmed=${confirmed}`, formData, config);
    },

    updateQuestionMcq(questionDTO) {
        return instance.put(`/instructor/questions-mcq`, questionDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------

    updateQuestionName(questionId, name) {
        return instance.patch(`/instructor/questions/${questionId}/name`, {value: name});
    },

    updateQuestionLevel(questionId, level) {
        return instance.patch(`/instructor/questions/${questionId}/level`, {value: level});
    },

    updateQuestionRequired(questionId, required) {
        return instance.patch(`/instructor/questions/${questionId}/required`, {value: required});
    },

    associateQuestionWithResource(questionId, resourceId) {
        return instance.patch(`/instructor/questions/${questionId}/associate-with-resource/${resourceId}`);
    },

    disassociateQuestionWithResource(questionId) {
        return instance.patch(`/instructor/questions/${questionId}/disassociate-with-resource`);
    },

    associateQuestionWithHelp(questionId, helpId) {
        return instance.patch(`/instructor/questions/${questionId}/associate-with-help/${helpId}`);
    },

    disassociateQuestionWithHelp(questionId) {
        return instance.patch(`/instructor/questions/${questionId}/disassociate-with-help`);
    },

    deleteQuestion(questionId) {
        return instance.delete(`/instructor/questions/${questionId}`);
    },

    //-----------------------------------------------------For table----------------------------------------------------
    fetchAllMCQByThemeIdForTable(themeId) {
        return instance.get(`/department/questions-mcq-table/all-mcq-by-theme?themeId=${themeId}`);
    },

}