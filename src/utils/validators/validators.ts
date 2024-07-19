interface ValidationResult {
    fields: string[];
}

interface FieldsObject {
    orgId?: string;
    facId?: string;
    classId?: string;
}

export const requiredField = (value: string | undefined): string | undefined => {
    if (value && value.trim() !== '') return undefined;
    return "Field is required";
}

export const allSelected = (value: FieldsObject | undefined): ValidationResult | undefined => {
    if (!value) return { fields: ["orgId", "facId", "classId"] };
    let arr: string[] = [];
    if (!value.orgId) arr.push("orgId");
    if (!value.facId) arr.push("facId");
    if (!value.classId) arr.push("classId");
    return arr.length ? { fields: arr } : undefined;
}

export const email = (value: string | undefined): string | undefined =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export interface AllValues {
    password?: string;
    [key: string]: any;
}

export const passwordsMustMatch = (value: string | undefined, allValues: AllValues): string | undefined =>
    value !== allValues.password ? 'Passwords do not match' : undefined;

export const required = (value: any): string | undefined =>
    value || typeof value === 'number' ? undefined : 'Required';

const maxLength = (max: number) => (value: string | undefined): string | undefined =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

const minLength = (min: number) => (value: string | undefined): string | undefined =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
