import React from 'react';
import PropTypes from 'prop-types';

const Affiliation = (props) => {

    const {isLMS, orgId} = props;

    const handleOrgChange = (value) => {
        props.clearClasses();
        props.clearFaculties();
        props.input.onChange({"orgId": value});
        if (value !== "") props.getFaculties(value, isLMS);
    }

    const handleFacChange = (value) => {
        props.clearClasses();
        if (isLMS) {
            props.input.onChange({"orgId": orgId, "facId": value});
        } else {
            props.input.onChange({...props.input.value, "classId": null, "facId": value});
        }
        if (value !== "") props.getClasses(value, isLMS);
    }

    const handleClaChange = (value) => {
        if (isLMS) {
            props.input.onChange({...props.input.value, "orgId": orgId, "classId": value});
        } else {
            props.input.onChange({...props.input.value, "classId": value});
        }
    }

    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
        <div>
            <div className="input-group form-group " title="Select your organisation" hidden={props.isLMS}>
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="orgId">Organisation</label>
                </div>
                <select id="orgId" name="orgId"
                        className={`custom-select ${!touched ? '' : hasError && error.fields.includes("orgId") ? 'is-invalid' : 'is-valid'}`}
                        onChange={e => handleOrgChange(e.target.value)}
                        value={props.input.value !== "" ? props.input.orgId : ""}>
                    {props.registration.ORG.map(item => <option key={item.orgId} value={item.orgId}>{item.name}</option>)}
                </select>
                {hasError && error.fields.includes("orgId") &&
                <div className="invalid-feedback d-block">Organisation must be selected</div>}
            </div>

            <div className="input-group form-group " title="Select your faculty">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="facId">Faculty</label>
                </div>
                <select id="facId" name="facId"
                        className={`custom-select ${!touched ? '' : hasError && error.fields.includes("facId") ? 'is-invalid' : 'is-valid'}`}
                        onChange={e => handleFacChange(e.target.value)}
                        value={props.input.value !== "" ? props.input.facId : ""}>
                    {props.registration.FAC.map(item => <option key={item.facId} value={item.facId}>{item.name}</option>)}
                </select>
                {hasError && error.fields.includes("facId") &&
                <div className="invalid-feedback d-block">Faculty must be selected</div>}
            </div>

            <div className="input-group form-group " title="Select your class">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="classId">Class</label>
                </div>
                <select id="classId" name="classId"
                        className={`custom-select ${!touched ? '' : hasError && error.fields.includes("classId") ? 'is-invalid' : 'is-valid'}`}
                        onChange={e => handleClaChange(e.target.value)}
                        value={props.input.value !== "" ? props.input.classId : ""}>
                    {props.registration.CLA.map(item => <option key={item.classId} value={item.classId}>{item.name}</option>)}
                </select>
                {hasError && error.fields.includes("classId") &&
                <div className="invalid-feedback d-block">Class must be selected</div>}
            </div>
        </div>
    );
}

Affiliation.propTypes = {
    // If from LMS
    orgId: PropTypes.number,
    isLMS: PropTypes.bool.isRequired,
    registration: PropTypes.object.isRequired,

    getFaculties: PropTypes.func.isRequired,
    getClasses: PropTypes.func.isRequired,
    clearFaculties: PropTypes.func.isRequired,
    clearClasses: PropTypes.func.isRequired,
};

export default Affiliation;