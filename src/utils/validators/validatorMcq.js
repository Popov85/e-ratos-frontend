const validateMcq = values => {
    const errors = {};
    const {answers} = values;
    if (!answers || answers.length < 2) {
        errors.answers = {_error: 'At least two answers must be present!'};
    } else {
        let controlSum = 0;
        let answersArray = [];
        let nullableRequired = false;
        answers.forEach(a => {
            let percent = 0;
            let required = false;
            if (a.percent) percent = Number(a.percent);
            if (a.required) required = (a.required == 'true');
            answersArray.push(a.answer);
            controlSum = controlSum + percent;
            if (percent === 0 && required) nullableRequired = true;
        });
        if (controlSum !== 100) {
            errors.answers = {_error: 'Control sum must be equal to 100, please check!'};
        } else if (nullableRequired) {
            errors.answers = {_error: 'Zero-percent answers cannot be required, please check!'};
        } else {
            let uniqueAnswersArray = new Set(answersArray);
            if (answers.length!==uniqueAnswersArray.size) {
                errors.answers = {_error: 'There are duplicate answers in place, please check!'};
            }
        }
    }
    return errors;
}

export default validateMcq;