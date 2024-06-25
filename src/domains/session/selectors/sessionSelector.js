export const getBatch = (state) => {
    return state.session.session.batch;
}

export const getResult = (state) => {
    return state.session.session.result;
}

export const getQuestion = (state) => {
    const {batch, questionNumber} = state.session.session;
    return batch.questions[questionNumber];
}

export const getHelp = (state) => {
    const {helps} = state.session.session;
    return helps.get(getQuestion(state).questionId);
}

export const getStars = (state) => {
    const {stars} = state.session.session;
    return stars.get(getQuestion(state).questionId);
}

export const getReport = (state) => {
    const {reports} = state.session.session;
    return reports.get(getQuestion(state).questionId);
}

export const getResponse = (state) => {
    const {responses} = state.session.session;
    return responses.get(getQuestion(state).questionId);
}

export const getResponseChecked = (state) => {
    const {responsesChecked} = state.session.session;
    const question = getQuestion(state);
    if (!question) return null;
    return responsesChecked.get(question.questionId);
}

