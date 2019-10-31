export const requiredField = value => {
    //console.log("Validator requiredField is in action...", value);
    if (value) return undefined;
    return "Field is required";
}

export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const minLength8 = minLength(8)
const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue13 = minValue(13)
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
const tooYoung = value =>
    value && value < 13
        ? 'You do not meet the minimum age requirement!'
        : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined
const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined


export const allSelected = value => {
    //console.log("Validator allSelected is in action...", value);
    if (!value) return {fields: ["orgId", "facId", "classId"]}
    if (value && !value.orgId || value && !value.facId || value && !value.classId) {
        let arr = [];
        if (!value.orgId ) arr.push("orgId");
        if (!value.facId ) arr.push("facId");
        if (!value.classId ) arr.push("classId");
        return {fields: arr};
    }
    return undefined;
}

export const passwordsMustMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords do not match' : undefined