const validateSchemeTheme = values => {
    const errors = {};
    const {typeLevelMap} = values;
    if (!typeLevelMap || typeLevelMap.length < 1) {
        errors.typeLevelMap = {_error: 'At least one type must be specified!'};
    } else {
        let controlSum = 0;
        typeLevelMap.forEach(map => {
            const {totalLevel1, totalLevel2, totalLevel3} = map;
            controlSum += Number(totalLevel1) + Number(totalLevel2) + Number(totalLevel3);
        });
        if (controlSum < 1) {
            errors.typeLevelMap = {_error: 'Type must contain at least 1 question!'};
        }
    }
    return errors;
}

export default validateSchemeTheme;