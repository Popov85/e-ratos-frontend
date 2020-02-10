import {createSelector} from "reselect";

export const getThemeIdFromProps = (state, props) => props.themeId;

export const getQuestionIdFromProps = (state, props) => props.questionId;

export const getAllQuestionsMcq = (state) => state.questionsMcq.content;

//---------------------------------------------------Re-selectors-------------------------------------------------------

export const getQuestionMcqByThemeIdAndQuestionId = createSelector(getAllQuestionsMcq, getThemeIdFromProps, getQuestionIdFromProps, (questions, themeId, questionId) => {
    if (!questions) return null; // it means a new question wil be created!
    const allQuestionMcqByTheme = questions[themeId];
    return allQuestionMcqByTheme.find(q => q.questionId === questionId);
});

