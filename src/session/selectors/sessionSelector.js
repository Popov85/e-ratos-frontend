export const getBatch = (state) => {
    return state.session.batch;
}

export const getResult = (state) => {
    return state.session.result;
}

export const getQuestion = (state) => {
    const {batch, questionNumber} = state.session;
    return batch.questions[questionNumber];
}

export const getHelp = (state) => {
    const {helps} = state.session;
    return helps.get(getQuestion(state).questionId);
}

export const getStars = (state) => {
    const {stars} = state.session;
    return stars.get(getQuestion(state).questionId);
}

export const getReport = (state) => {
    const {reports} = state.session;
    return reports.get(getQuestion(state).questionId);
}

export const getResponse = (state) => {
    const {responses} = state.session;
    return responses.get(getQuestion(state).questionId);
}

export const getResponseChecked = (state) => {
    const {responsesChecked} = state.session;
    return responsesChecked.get(getQuestion(state).questionId);
}

export const isQuestionChecked = (state) => {
    const {responsesChecked} = state.session;
    return responsesChecked.has(getQuestion(state).questionId);
}

