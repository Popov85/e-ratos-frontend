const validateScheme = values => {
    const errors = {};
    const {themes} = values;
    if (!themes || themes.length < 1) {
        errors.themes = {_error: 'At least one theme must be specified!'};
    } else {
        let controlSum = 0;
        themes.forEach(v => {
            let s = v.settings;
            s.forEach(s => {
                const {level1, level2, level3} = s;
                controlSum += level1 + level2 + level3;
            });
        });
        if (controlSum < 1) {
            errors.themes = {_error: 'Scheme must contain at least 1 question!'};
        }
    }
    return errors;
}

export default validateScheme;