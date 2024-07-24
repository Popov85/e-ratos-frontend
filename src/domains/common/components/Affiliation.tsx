import React from 'react';
import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Class} from "../types/Class";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {clearClasses, clearFaculties, getClasses, getFaculties} from "../actions/registrationActions";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import {RootState} from "../../../store/rootReducer";


type Props = {
    orgId: number;
    isLMS: boolean;
    input: AffiliationInputProps;
    meta: WrappedFieldMetaProps;
}

type AffiliationInputProps = WrappedFieldInputProps & {
    orgId?: number;
    facId?: number;
    classId?: number;
};

const Affiliation: React.FC<Props> = ({isLMS, orgId, input, meta}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const ORG: Array<Organisation> = useSelector((state: RootState) => state.registration.ORG);
    const FAC: Array<Faculty> = useSelector((state: RootState) => state.registration.FAC);
    const CLA: Array<Class> = useSelector((state: RootState) => state.registration.CLA);

    const handleOrgChange = (value: number) => {
        dispatch(clearClasses());
        dispatch(clearFaculties());
        input.onChange({"orgId": value});
        if (value) dispatch(getFaculties(value, isLMS));
    }

    const handleFacChange = (value: number) => {
        dispatch(clearClasses());
        if (isLMS) {
            input.onChange({"orgId": orgId, "facId": value});
        } else {
            input.onChange({...input.value, "classId": null, "facId": value});
        }
        if (value) dispatch(getClasses(value, isLMS));
    }

    const handleClaChange = (value: number) => {
        if (isLMS) {
            input.onChange({...input.value, "orgId": orgId, "classId": value});
        } else {
            input.onChange({...input.value, "classId": value});
        }
    }

    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div>
            <div className="input-group form-group " title="Select your organisation" hidden={isLMS}>
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="orgId">Organisation</label>
                </div>
                <select id="orgId" name="orgId"
                        className={`custom-select ${!touched ? '' : hasError && error.fields.includes("orgId") ? 'is-invalid' : 'is-valid'}`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleOrgChange(Number(e.target.value))}
                        value={input.value !== "" ? input.orgId : ""}>
                    {ORG.map((item: Organisation) => <option key={item.orgId}
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFacChange(Number(e.target.value))}
                        value={input.value !== "" ? input.facId : ""}>
                    {FAC.map((item: Faculty) => <option key={item.facId}
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleClaChange(Number(e.target.value))}
                        value={input.value !== "" ? input.classId : ""}>
                    {CLA.map((item: Class) => <option key={item.classId}
                                                                   value={item.classId}>{item.name}</option>)}
                </select>
                {hasError && error.fields.includes("classId") &&
                    <div className="invalid-feedback d-block">Class must be selected</div>}
            </div>
        </div>
    );
}

export default Affiliation;