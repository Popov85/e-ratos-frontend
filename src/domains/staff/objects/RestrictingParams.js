/**
 * Used to send params to build a report on results;
 */
export class RestrictingParams {
    constructor(restrictingParams) {
        const {organisation, faculty, department, course, scheme, sessionEndedFrom, sessionEndedTo} = restrictingParams;
        this.organisation = organisation;
        this.faculty = faculty;
        this.department = department;
        let specs = {};
        if (course) specs = {...specs, "course": {filterVal: course}};
        if (scheme) specs = {...specs, "scheme": {filterVal: scheme}};
        if (sessionEndedFrom) specs = {...specs, "sessionEndedFrom": {filterVal: {date: sessionEndedFrom} }};
        if (sessionEndedTo) specs = {...specs, "sessionEndedTo": {filterVal: {date: sessionEndedTo} }};
        this.specs = specs;
    }
}