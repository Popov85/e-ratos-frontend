import React from 'react';
import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Class} from "../types/Class";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {clearClasses, clearFaculties, getClasses, getFaculties} from "../actions/registrationActions";

type Props = {
    orgId: number;
    isLMS: boolean;
    input: any; //react-form specific
    meta: any; //react-form specific
    registration: {
        ORG: Array<Organisation>;
        FAC: Array<Faculty>;
        CLA: Array<Class>;
    };

    //getFaculties: (orgId: number, isLMS: boolean) => void;
    //getClasses: (facId: number, isLMS: boolean) => void;
    //clearFaculties: () => void;
    //clearClasses: () => void;
}


const Affiliation: React.FC<Props> = (props) => {

    const dispatch: Dispatch<any> = useDispatch();

    const {isLMS, orgId} = props;

    const handleOrgChange = (value: number) => {
        dispatch(clearClasses());
        dispatch(clearFaculties());
        props.input.onChange({"orgId": value});
        if (value) dispatch(getFaculties(value, isLMS));
    }

    const handleFacChange = (value: number) => {
        dispatch(clearClasses());
        if (isLMS) {
            props.input.onChange({"orgId": orgId, "facId": value});
        } else {
            props.input.onChange({...props.input.value, "classId": null, "facId": value});
        }
        if (value) dispatch(getClasses(value, isLMS));
    }

    const handleClaChange = (value: number) => {
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
                        onChange={e => handleOrgChange(Number(e.target.value))}
                        value={props.input.value !== "" ? props.input.orgId : ""}>
                    {props.registration.ORG.map(item => <option key={item.orgId}
                                                                value={item.orgId}>{item.name}</option>)}
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
                        onChange={e => handleFacChange(Number(e.target.value))}
                        value={props.input.value !== "" ? props.input.facId : ""}>
                    {props.registration.FAC.map(item => <option key={item.facId}
                                                                value={item.facId}>{item.name}</option>)}
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
                        onChange={e => handleClaChange(Number(e.target.value))}
                        value={props.input.value !== "" ? props.input.classId : ""}>
                    {props.registration.CLA.map(item => <option key={item.classId}
                                                                value={item.classId}>{item.name}</option>)}
                </select>
                {hasError && error.fields.includes("classId") &&
                    <div className="invalid-feedback d-block">Class must be selected</div>}
            </div>
        </div>
    );
}

export default Affiliation;